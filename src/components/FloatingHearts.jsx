import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

const Field = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`

const symbols = ['♡', '✦', '♥', '✧']

function makeParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 10 + Math.random() * 22,
    duration: 14 + Math.random() * 16,
    delay: Math.random() * 12,
    symbol: symbols[i % symbols.length],
    opacity: 0.15 + Math.random() * 0.35,
    drift: Math.random() * 60 - 30,
  }))
}

export default function FloatingHearts({ count = 26 }) {
  const particles = useMemo(() => makeParticles(count), [count])

  return (
    <Field>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: '110vh', x: 0, opacity: 0 }}
          animate={{
            y: '-15vh',
            x: [0, p.drift, 0],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            fontSize: p.size,
            color: p.symbol === '✦' || p.symbol === '✧' ? '#e8c27a' : '#ff8fab',
            filter: 'blur(0.2px)',
          }}
        >
          {p.symbol}
        </motion.span>
      ))}
    </Field>
  )
}
