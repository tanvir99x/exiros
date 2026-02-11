import sqlite3

conn = sqlite3.connect("exiros.db", check_same_thread=False)
cursor = conn.cursor()

# ---------------- USERS TABLE ----------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    wallet TEXT PRIMARY KEY,
    exi INTEGER DEFAULT 0
)
""")

# ---------------- CLAIMS TABLE ----------------
cursor.execute("""
CREATE TABLE IF NOT EXISTS claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT,
    fid INTEGER,
    address TEXT
)
""")

conn.commit()


# ---------------- CLAIM SYSTEM ----------------
def already_claimed(task, fid, address):
    cursor.execute(
        "SELECT 1 FROM claims WHERE task=? AND (fid=? OR address=?)",
        (task, fid, address),
    )
    return cursor.fetchone() is not None


def record_claim(task, fid, address):
    cursor.execute(
        "INSERT INTO claims (task, fid, address) VALUES (?, ?, ?)",
        (task, fid, address),
    )
    conn.commit()


# ---------------- EXI SYSTEM ----------------
def add_exi(wallet, amount):
    cursor.execute("SELECT exi FROM users WHERE wallet=?", (wallet,))
    row = cursor.fetchone()

    if row:
        new_exi = row[0] + amount
        cursor.execute(
            "UPDATE users SET exi=? WHERE wallet=?",
            (new_exi, wallet),
        )
    else:
        new_exi = amount
        cursor.execute(
            "INSERT INTO users (wallet, exi) VALUES (?, ?)",
            (wallet, new_exi),
        )

    conn.commit()
    return new_exi


def get_leaderboard():
    cursor.execute(
        "SELECT wallet, exi FROM users ORDER BY exi DESC"
    )
    return cursor.fetchall()


def get_rank(wallet):
    cursor.execute(
        "SELECT wallet FROM users ORDER BY exi DESC"
    )
    rows = cursor.fetchall()

    for index, row in enumerate(rows):
        if row[0] == wallet:
            return index + 1

    return None
