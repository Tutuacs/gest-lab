import { ROLE } from "@/common/role.enums";
import ButtonByRole from "@/components/ButtonByRole";

export default function Home() {
    return (
        <main>
            <div className="flex flex-col min-h-full mb-10">
                <section className="w-full">
                    <div className="flex flex-col items-center">
                        <h1 className="mb-10 text-6xl font-bold text-center text-black animate-pulse">
                            User Home / Saymon
                        </h1>
                        <div className="flex flex-row items-center gap-4">
                            <ButtonByRole role={ROLE.MASTER} />
                            <ButtonByRole role={ROLE.ADMIN} />
                            <ButtonByRole role={ROLE.USER} />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}