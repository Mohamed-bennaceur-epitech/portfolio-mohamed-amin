import Section from './Section'
import { DATA } from '../data'

export default function Contact() {
  return (
    <Section id="contact" title="Get in touch">
      <div className="grid md:grid-cols-2 gap-8">

        {/* Social buttons */}
        <div className="space-y-3">
          {DATA.socials.map((s) => {
            const isMail = s.link.startsWith('mailto:')
            const displayLink = isMail ? s.link.replace('mailto:', '') : s.link

            return (
              <a
                key={s.label}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group block card relative overflow-hidden
                  text-center font-medium px-4 py-3
                  transition-all hover:translate-y-[-2px]
                  bg-white/5 text-white border border-white/10
                  duration-200
                  group-hover:bg-white group-hover:text-black group-hover:border-white
                "
              >
                <span
                  className="
                    absolute inset-0 flex items-center justify-center px-4
                    transition-all duration-200
                    opacity-100 translate-y-0
                    group-hover:opacity-0 group-hover:-translate-y-1
                  "
                >
                  {s.label}
                </span>

                <span
                  className="
                    absolute inset-0 flex items-center justify-center px-4
                    transition-all duration-200
                    opacity-0 translate-y-1
                    group-hover:opacity-100 group-hover:translate-y-0
                    break-all
                  "
                >
                  {displayLink}
                </span>

                <span className="invisible">{s.label}</span>
              </a>
            )
          })}
        </div>

        {/* Opportunities */}
        <div className="card text-white/80 space-y-2">
          {DATA.opportunities?.map((s: { desc: string }, i: number) => (
            <div key={i}>{s.desc}</div>
          )) || null}
        </div>

      </div>
    </Section>
  )
}
