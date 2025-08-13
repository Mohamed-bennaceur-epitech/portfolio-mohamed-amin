import Section from './Section'
import { DATA } from '../data'
import { useEffect, useState } from 'react'
import { animate } from 'framer-motion'

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.0,
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [value])
  return <span>{count}</span>
}

export default function Stats() {
  return (
    <Section id="stats" title="Fun Stats">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
        {DATA.stats.map((s) => (
          <div key={s.label} className="card px-4 py-6">
            <div className="text-3xl sm:text-4xl font-extrabold">
              <Counter value={s.value} />
            </div>
            <div className="mt-2 text-white/70 text-sm sm:text-base break-words whitespace-normal">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}