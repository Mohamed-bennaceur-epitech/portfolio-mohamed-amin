import { motion } from 'framer-motion'
import Section from './Section'
import { DATA } from '../data'

export default function Timeline() {
  const items = [...DATA.experience, ...DATA.education]
  return (
    <Section id="timeline" title="Experience & Education">
      <div className="relative pl-6">
        <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-white/10" />
        <div className="space-y-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="card"
            >
              <div className="text-sm text-white/60">{item.period}</div>
              <div className="font-bold mt-1">{item.title} — <span className="text-white/80">{item.org}</span></div>
              {"desc" in item && <p className="mt-2 text-white/80">{(item as any).desc}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
