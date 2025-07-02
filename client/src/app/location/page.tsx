'use client';

import { ROLE } from "@/common/role.enums";
import { Button } from "@/components/button";
import LocationRelatorio from "@/components/RelLocation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LocationPage() {
  const router = useRouter();

  const { data: session, status } = useSession()

  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-12 bg-gray-200">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full mb-4 space-x-4">
        <div></div>
        <h1 className="text-4xl font-bold text-black text-center">
          Locais Cadastrados
        </h1>
        <div className="flex justify-end">
          {
            session?.profile.role == ROLE.MASTER && (
              <Button
                onClick={() => router.push("/location/create")}
                className="font-bold"
              >
                Novo Local
              </Button>
            )
          }
        </div>
      </div>
      <div className="bg-white shadow rounded-3xl w-full overflow-hidden">
        <LocationRelatorio />
      </div>

    </main>
  );
}