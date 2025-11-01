import Hero from './components/Hero'
import Nav from './components/Nav'
import About from './components/About'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Stats from './components/Stats'
import Contact from './components/Contact'
import PlaygroundPopup from "./components/PlaygroundPopup";
import { useEffect } from 'react'

export default function App() {
  // Simple background color change on scroll
  useEffect(() => {
    const root = document.documentElement
    const onScroll = () => {
      const y = window.scrollY
      const h = window.innerHeight
      if (y < h * 0.8) root.style.backgroundColor = '#0f172a'
      else if (y < h * 2) root.style.backgroundColor = '#0b1220'
      else root.style.backgroundColor = '#0f172a'
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Projects />
      <Stats />
      <Contact />
      <footer className="mt-16 border-t border-white/10">
        <div className="container-max py-6 text-sm text-white/50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>© {new Date().getFullYear()} Mohamed Amin Ben Naceur</div>
          <ul className="flex flex-wrap gap-2">
            {[
              { label: '📞 +33 7 60 37 09 19', href: 'tel:+33760370919' },
              { label: '✉️ Email', href: 'mailto:mohamed-amin.ben-naceur@epitech.eu' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamed-amin-ben-naceur-8a6457184/' },
              { label: 'GitHub', href: 'https://github.com/Mohamed-bennaceur-epitech' },
              { label: 'Itch.io', href: 'https://miro2842.itch.io/' },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  className="rounded-full border border-white/10 px-3 py-1.5 hover:border-white hover:bg-white hover:text-black transition"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
      <PlaygroundPopup />
    </div>
  )
}
