from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests

from db import (
    already_claimed,
    record_claim,
    add_exi,
    get_leaderboard,
    get_rank,
)

load_dotenv()

NEYNAR_API_KEY = os.getenv("NEYNAR_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- MODELS ----------------

class VerifyRequest(BaseModel):
    task: str
    fid: int | None = None
    address: str | None = None
    proof: str | None = None


class AddEXIRequest(BaseModel):
    wallet: str
    amount: int = 100


# ---------------- FARCASTER VERIFY ----------------

def verify_farcaster_user(fid: int) -> bool:
    if not NEYNAR_API_KEY:
        return False

    url = f"https://api.neynar.com/v2/farcaster/user/bulk?fids={fid}"

    res = requests.get(
        url,
        headers={"api_key": NEYNAR_API_KEY},
    )

    return res.status_code == 200


def verify_x_proof(proof: str | None) -> bool:
    if not proof:
        return False

    REQUIRED_KEYWORD = "exiros"
    return REQUIRED_KEYWORD.lower() in proof.lower()


# ---------------- VERIFY ROUTE ----------------

@app.post("/verify")
def verify(req: VerifyRequest):
    if already_claimed(req.task, req.fid, req.address):
        raise HTTPException(403, "Task already claimed")

    if req.task.startswith("farcaster"):
        if not req.fid or not verify_farcaster_user(req.fid):
            raise HTTPException(403, "Farcaster verification failed")

    if req.task.startswith("x_"):
        if not verify_x_proof(req.proof):
            raise HTTPException(403, "X verification failed")

    record_claim(req.task, req.fid, req.address)

    return {"success": True}


# ---------------- ADD EXI ROUTE ----------------

@app.post("/add-exi")
def add_exi_route(req: AddEXIRequest):
    try:
        total = add_exi(req.wallet, req.amount)
        rank = get_rank(req.wallet)

        return {
            "wallet": req.wallet,
            "exi": total,
            "rank": rank,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------------- LEADERBOARD ----------------

@app.get("/leaderboard")
def leaderboard():
    board = get_leaderboard()

    return [
        {"wallet": row[0], "exi": row[1]}
        for row in board
    ]
