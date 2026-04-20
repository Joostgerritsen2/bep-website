'use client'
import Image from 'next/image'
import { useLang } from '@/lib/language'

const logos = [
  { src: '/images/client-tender-strateeg.png', alt: 'Tender Strateeg' },
  { src: '/images/client-groningen-seaports.png', alt: 'Groningen Seaports' },
  { src: '/images/client-sjb-advies.png', alt: 'SJB Advies' },
  { src: '/images/client-bpz.png', alt: 'BPZ' },
]

export function MarqueeLogos() {
  const { t } = useLang()

  return (
    <section className="marquee-wrap">
      <div className="marquee-track">
        {/* Twee keer voor naadloze loop */}
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="marquee-logo-item">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
