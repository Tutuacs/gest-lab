"use client";
;
import LicenseList from "@/components/RelCertificate";
import { useRouter } from "next/navigation";

export default function CertificadoRelatorio() {
  const router = useRouter();

  return (
    <main className="flex-1 w-full flex flex-col items-center justify-center p-12 bg-gray-200">
        <h1 className="text-4xl font-bold text-black text-center mb-8">
            Certificados Cadastrados
        </h1>
      
      <div className="bg-white shadow rounded-3xl w-full overflow-hidden">
        <LicenseList licenses={[]} onDelete={function (id: number): void {
                  throw new Error("Function not implemented.");
              } } />
      </div>
      
    </main>
  )
}