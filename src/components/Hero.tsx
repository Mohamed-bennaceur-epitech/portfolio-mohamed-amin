import { motion } from 'framer-motion'
import { DATA } from '../data'

function smoothScrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  return (
    <section id="hero" className="min-h-[90vh] flex items-center gradient-surface">
      <div className="container-max">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-widest text-sm text-white/70"
        >
          Welcome to my world
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold mt-4"
        >
          {DATA.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mt-6 text-lg text-white/80"
        >
          {DATA.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex gap-3"
        >
          <button
            type="button"
            onClick={() => smoothScrollTo('projects')}
            className="btn btn-primary"
          >
            View Projects
          </button>

          <button
            type="button"
            onClick={() => smoothScrollTo('contact')}
            className="btn"
          >
            Contact Me
          </button>
        </motion.div>
      </div>
    </section>
  )
}
