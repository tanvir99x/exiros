"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/connect"), 900);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="splash">
      <Image src="/logo.png" alt="Exiros Logo" width={160} height={160} priority />
    </main>
  );
}
