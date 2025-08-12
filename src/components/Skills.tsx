import { motion } from 'framer-motion'
import Section from './Section'
import { DATA } from '../data'

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid md:grid-cols-3 gap-6">
        {DATA.skills.map((group, idx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="card"
          >
            <div className="font-semibold mb-2">{group.category}</div>
            <ul className="text-white/80 text-sm list-disc pl-5 space-y-1">
              {group.items.map((it: string) => <li key={it}>{it}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
