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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="rounded-full border border-white/10 bg-black/40 backdrop-blur px-4 py-2">
        <ul className="flex gap-3 text-sm">
          {links.map(l => (
            <li key={l.href}><a className="px-3 py-1 hover:text-accent" href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
