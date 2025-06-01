import { ROLE } from "@/common/role.enums";
import ButtonByRole from "@/components/ButtonByRole";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <div className="flex flex-col min-h-full mb-10">
                <section className="w-full">
                    <div className="flex flex-col items-center">
                        <h1 className="mb-10 mt-10 text-6xl font-bold text-center text-black animate-pulse">
                            User Home / Saymon
                        </h1>
                        <div className="flex flex-wrap flex-row items-center gap-4">
                            <ButtonByRole role={ROLE.MASTER} />
                            <ButtonByRole role={ROLE.ADMIN} />
                            <ButtonByRole role={ROLE.USER} />
                            <Link href="/equipament-info">
                                <button className="p-4 border border-gray-300 rounded-md hover:bg-green-100">
                                    Informações Equipamento
                                </button>
                            </Link>
                            <Link href="/equipament">
                                <button className="p-4 border border-gray-300 rounded-md hover:bg-green-100">
                                    Relatório de Equipamentos
                                </button>
                            </Link>
                            <Link href="/equipament/create">
                                <button className="p-4 border border-gray-300 rounded-md hover:bg-green-100">
                                    Cadastro de Equipamento
                                </button>
                            </Link>
                            <Link href="/equipament-type">
                                <button className="p-4 border border-gray-300 rounded-md hover:bg-green-100">
                                    Cadastro de Tipo de Equipamento
                                </button>
                            </Link>
                            <Link href="/event">
                                <button className="p-4 border border-gray-300 rounded-md hover:bg-green-100">
                                    Cadastro de Evento
                                </button>
                            </Link>
                            <Link href="/license">
                                <button className="p-4 border border-gray-300 rounded-md hover:bg-green-100">
                                    Cadastro de Licença
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
