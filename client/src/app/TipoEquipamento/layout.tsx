import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

interface PrivateLayoutProps {
    children: React.ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
    const session = await getServerSession(authOptions);


    // TODO: Uncomment this when authentication is implemented

    // if (!session || session.profile.role !== "MASTER") {
    //     redirect("/login");
    // }

    return <>{children}</>;
}