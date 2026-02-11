"use client";

import { useState } from "react";
import tasks from "../../config/tasks.json";
import TaskCard from "../../components/TaskCard";
import BottomNav from "../../components/BottomNav";
import ProfileSlide from "../../components/ProfileSlide";
import AnnouncementPopup from "../../components/AnnouncementPopup";

export default function HomePage() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeTasks, setActiveTasks] = useState(tasks);
  const [completedTasks, setCompletedTasks] = useState<typeof tasks>([]);

  const handleDone = (task: any) => {
    setActiveTasks((prev) =>
      prev.filter((t) => t.id !== task.id)
    );
    setCompletedTasks((prev) => [...prev, task]);
  };

  return (
    <main>
      <AnnouncementPopup />

      <h2 className="home-title">Tasks</h2>

      <div className="task-list">
        {activeTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            link={task.link}   // ✅ FIXED
            fee={task.fee}     // ✅ REQUIRED
            onDone={() => handleDone(task)}
          />
        ))}

        {completedTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            link={task.link}
            fee={task.fee}
            onDone={() => {}}
          />
        ))}
      </div>

      <ProfileSlide
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      <BottomNav onProfile={() => setProfileOpen(true)} />
    </main>
  );
}
