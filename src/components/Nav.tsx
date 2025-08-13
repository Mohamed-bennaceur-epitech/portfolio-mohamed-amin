const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#projects', label: 'Projects' },
  { href: '#stats', label: 'Stats' },
  { href: '#contact', label: 'Contact' }
]

export default function Nav() {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-3">
      <nav className="max-w-[90vw] md:max-w-fit overflow-x-auto no-scrollbar whitespace-nowrap rounded-full border border-white/10 bg-black/40 backdrop-blur px-3 py-2">
        <ul className="flex gap-2 text-sm">
          {links.map(l => (
            <li key={l.href}>
              <a className="px-3 py-1 inline-block hover:text-accent" href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}