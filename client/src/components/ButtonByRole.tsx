"use client";

import { ROLE } from "@/common/role.enums";
import { useSession } from "next-auth/react";
import useFetch from "@/utils/useFetch";
import { useEffect, useState } from "react";

export default function ButtonByRole({ role }: { role: ROLE }) {
    const [click, setClick] = useState(false);

    const { data: session } = useSession();
    const { fetchWithAuth } = useFetch();

    useEffect(() => {
        if (!session) return;

        async function consult() {
            const result = await fetchWithAuth(`/${role}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log(result?.status);
        }

        if (click) {
            consult();
            setClick(false);
        }
    }, [click]);

    if (!session) {
        return null;
    }

    return (
        <button
            onClick={() => setClick(true)}
            className="text-sm px-3 py-1 border border-gray-300 rounded-md  hover:bg-gray-200 transition"
        >
            Consultar {role}
        </button>
    );
}
