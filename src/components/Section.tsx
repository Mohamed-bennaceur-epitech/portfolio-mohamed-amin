import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function Section({ id, title, children }: { id: string, title?: string, children: ReactNode }) {
  return (
    <section id={id} className="section-pad container-max">
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8"
        >
          {title}
        </motion.h2>
      )}
      {children}
    </section>
  )
}