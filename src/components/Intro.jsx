import { useState } from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { Stage, Card, Script, Serif, PrimaryButton } from './Shell.jsx'
import { theme } from '../theme.js'

const Eyebrow = styled(motion.p)`
  font-family: ${theme.fontUI};
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-size: 12px;
  color: ${theme.rose};
  margin-bottom: 18px;
`

const Ring = styled(motion.div)`
  font-size: 40px;
  margin-bottom: 6px;
`

export default function Intro({ onEnter }) {
  const [entering, setEntering] = useState(false)

  const handleEnter = () => {
    setEntering(true)
    onEnter()
  }

  return (
    <Stage>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <Card>
          <Ring
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            💍
          </Ring>
          <Eyebrow
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Para Carolina Sáez
          </Eyebrow>
          <Script>Carolina, tengo algo muy importante que preguntarte…</Script>
          <div style={{ height: 22 }} />
          <Serif>
            Antes de continuar, necesito que respondas con el corazón.
            <br />
            ¿Estás lista?
          </Serif>
          <div style={{ height: 34 }} />
          <PrimaryButton
            as={motion.button}
            whileTap={{ scale: 0.96 }}
            onClick={handleEnter}
            disabled={entering}
          >
            {entering ? 'Abriendo mi corazón…' : 'Sí, estoy lista ✨'}
          </PrimaryButton>
        </Card>
      </motion.div>
    </Stage>
  )
}
