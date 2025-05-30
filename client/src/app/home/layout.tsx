// UserLayout.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
    children: React.ReactNode;
}

export default async function HomeLayout({ children }: PrivateLayoutProps) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login")
    }

    return (
        <main>
            {children}
        </main>
    );
}
