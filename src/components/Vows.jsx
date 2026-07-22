import { useState } from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { Stage, Card, Script, Serif, PrimaryButton } from './Shell.jsx'
import { theme } from '../theme.js'
import { VOWS } from '../data/vows.js'

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 26px 0 8px;
  text-align: left;
`

const Row = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${theme.glassBorder};
`

const VowText = styled.p`
  flex: 1;
  font-family: ${theme.fontSerif};
  font-style: italic;
  font-size: 16px;
  line-height: 1.35;
  color: ${theme.ivory};
`

const Track = styled.button`
  position: relative;
  flex-shrink: 0;
  width: 52px;
  height: 30px;
  border-radius: 999px;
  background: ${(props) => (props.$on ? theme.gold : 'rgba(255,255,255,0.15)')};
  transition: background 0.25s ease;
`

const Knob = styled(motion.span)`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${theme.ivory};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`

const Counter = styled.p`
  font-family: ${theme.fontUI};
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
`

export default function Vows({ onComplete }) {
  const [accepted, setAccepted] = useState(() => VOWS.map(() => false))
  const allAccepted = accepted.every(Boolean)
  const count = accepted.filter(Boolean).length

  const toggle = (i) => {
    setAccepted((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  return (
    <Stage>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card style={{ maxWidth: 600 }}>
          <Script style={{ fontSize: 'clamp(28px, 6vw, 40px)' }}>Nuestras promesas</Script>
          <Serif>Antes de sellarlo, acepta cada una 🤍</Serif>

          <List>
            {VOWS.map((text, i) => (
              <Row key={i}>
                <VowText>{text}</VowText>
                <Track $on={accepted[i]} onClick={() => toggle(i)} aria-pressed={accepted[i]}>
                  <Knob
                    animate={{ left: accepted[i] ? 25 : 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  >
                    {accepted[i] ? '💛' : ''}
                  </Knob>
                </Track>
              </Row>
            ))}
          </List>

          <Counter>
            {count} / {VOWS.length} promesas aceptadas
          </Counter>

          <div style={{ height: 24 }} />
          <PrimaryButton
            as={motion.button}
            whileTap={{ scale: 0.95 }}
            disabled={!allAccepted}
            onClick={onComplete}
          >
            Sellar nuestro compromiso 💍
          </PrimaryButton>
        </Card>
      </motion.div>
    </Stage>
  )
}
