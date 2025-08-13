import { motion } from 'framer-motion'
import Section from './Section'
import { DATA } from '../data'

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {DATA.projects.map((p, idx) => (
          <motion.a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
            className="card group overflow-hidden md:hover:translate-y-[-4px] transition"
          >
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 relative">
              {('image' in p && (p as any).image) ? (
                <img
                  src={(p as any).image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-300 md:group-hover:scale-[1.03]"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full anim-gradient" />
              )}
              <div className="pointer-events-none absolute inset-0 opacity-0 md:group-hover:opacity-10 transition bg-white" />
            </div>

            <div className="font-semibold">{p.title}</div>
            <p className="text-white/70 text-sm mt-1">{p.desc}</p>
          </motion.a>
        ))}
      </div>
    </Section>
  )
}