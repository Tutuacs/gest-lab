"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false,
    });

    router.push("/login");
  }

  return (
    <button
      onClick={logout}
      className="ml-4 w-40 p-2 border border-gray-300 rounded-xl hover:bg-red-900"
    >
      Sair
    </button>
  );
}
