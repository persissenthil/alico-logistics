"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const response = await fetch("/api/admin/logout", {
      method: "POST",
    });

    if (response.ok) {
      router.push("/admin/login");
      router.refresh();
    } else {
      alert("Failed to log out.");
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
    >
      Logout
    </button>
  );
}