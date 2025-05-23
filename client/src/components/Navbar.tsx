import NavLinks from "./NavLinks";

export default async function Navbar() {

  return (
    <main>
      <nav className="navbar visible bg-gray-900 shadow-lg z-10">
        <div className="text-2xl text-white">
          <NavLinks />
        </div>
      </nav>
    </main>
  );
}
