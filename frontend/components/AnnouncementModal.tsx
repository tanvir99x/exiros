"use client";

import { useEffect, useState } from "react";
import data from "../config/announcements.json";

export default function AnnouncementModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!data.active) return;

    if (data.showOncePerSession) {
      const seen = sessionStorage.getItem("exiros_notice_seen");
      if (seen) return;
      sessionStorage.setItem("exiros_notice_seen", "1");
    }

    setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{data.title}</h2>
        <p>{data.message}</p>

        <button className="modal-btn allow" onClick={() => setOpen(false)}>
          Got it
        </button>
      </div>
    </div>
  );
}
