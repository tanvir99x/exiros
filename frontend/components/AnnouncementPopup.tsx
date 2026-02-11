"use client";

import { useEffect, useState } from "react";
import { getAnnouncement } from "../lib/announcement";

export default function AnnouncementPopup() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const seen = localStorage.getItem("announcement_seen");
    getAnnouncement().then((res) => {
      if (res?.show && res.version.toString() !== seen) {
        setData(res);
        localStorage.setItem("announcement_seen", res.version.toString());
      }
    });
  }, []);

  if (!data) return null;

  return (
    <div className="announcement">
      <h3>{data.title}</h3>
      <p>{data.message}</p>
      <button onClick={() => setData(null)}>Got it</button>
    </div>
  );
}
