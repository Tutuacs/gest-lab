import NavLinks from "./NavLinks";

export default async function Navbar() {
  return (
    <header className="w-full bg-blue-950 shadow-md px-6 py-4 rounded-b-xl">
      <nav className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Título da aplicação */}
        <div className="text-2xl font-bold text-white tracking-wide text-center sm:text-left">
          GestLab
        </div>

        {/* Links de navegação */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-white items-center sm:items-center justify-center sm:justify-end">
          <NavLinks />
        </div>
      </nav>
    </header>
  );
}
