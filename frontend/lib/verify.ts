const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function verifyTask(payload: {
  task: string;
  fid?: number;
  address?: string;
  proof?: string;
}) {
  const res = await fetch(`${API}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Verification failed");
  return res.json();
}
