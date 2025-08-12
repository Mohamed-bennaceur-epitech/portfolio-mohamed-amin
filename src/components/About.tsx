import { motion } from 'framer-motion'
import Section from './Section'
import { DATA } from '../data'

export default function About() {
  return (
    <Section id="about" title="About Me">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <p className="leading-relaxed">{DATA.about}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="card h-56 flex items-center justify-center"
        >
          <div className="w-28 h-28 rounded-full bg-accent/30 border border-white/10 animate-pulse" />
        </motion.div>
      </div>
    </Section>
  )
}
