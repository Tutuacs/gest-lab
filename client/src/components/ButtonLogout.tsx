"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
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
    <Link
      href="/login"
      onClick={logout}
      className="py-2 px-6 rounded-xl font-bold bg-red-700 hover:bg-red-800 transition-all duration-300"
    >
      Sair
    </Link>
  );
}
