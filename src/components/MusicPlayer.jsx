import { useState } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { theme } from '../theme.js'

const ToggleButton = styled(motion.button)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 50;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.glass};
  border: 1px solid ${theme.glassBorder};
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${theme.goldSoft};
`

const Bar = styled(motion.span)`
  display: inline-block;
  width: 3px;
  background: ${theme.gold};
  border-radius: 2px;
  margin: 0 1px;
`

export default function MusicPlayer({ audioRef, playing }) {
  const [muted, setMuted] = useState(false)

  const toggleMute = () => {
    const el = audioRef.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }

  return (
    <ToggleButton
      onClick={toggleMute}
      whileTap={{ scale: 0.9 }}
      aria-label={muted ? 'Activar música' : 'Silenciar música'}
      title={muted ? 'Activar música' : 'Silenciar música'}
    >
      {muted ? (
        '🔇'
      ) : (
        <span style={{ display: 'flex', alignItems: 'center', height: 16 }}>
          {[0, 1, 2].map((i) => (
            <Bar
              key={i}
              animate={playing ? { height: [6, 16, 8, 14, 6] } : { height: 6 }}
              transition={{
                duration: 1 + i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </span>
      )}
    </ToggleButton>
  )
}
