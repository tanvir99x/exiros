const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function getAnnouncement() {
  try {
    const res = await fetch(`${API_URL}/announcement`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
