import NavLinks from './NavLinks'
import Link from 'next/link'

export default async function Navbar() {
  return (
    <header className="w-full bg-blue-950 shadow-md" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
      <nav className="mx-auto flex flex-row items-center justify-between">
        <Link href="/home">
          <div className="text-2xl font-bold text-white tracking-wide text-center cursor-pointer">
            GestLab App
          </div>
        </Link>
        <div className="flex flex-row text-white items-center justify-end">
          <NavLinks />
        </div>
      </nav>
    </header>
  )
}
