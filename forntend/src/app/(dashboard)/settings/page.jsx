"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SettingsScreen() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/settings/general");
  }, [router]);
  return null;
}
