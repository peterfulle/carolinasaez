import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import styled from '@emotion/styled'
import { Stage, Card, Script, PrimaryButton, Dots, Dot } from './Shell.jsx'
import { theme } from '../theme.js'

const questions = [
  '¿Te gusta pasar tiempo conmigo?',
  '¿Confías en mí con los ojos cerrados?',
  '¿Te hago reír incluso en tus peores días?',
  '¿Sientes que a mi lado todo es más fácil?',
  '¿Quieres seguir construyendo recuerdos juntos, para siempre?',
]

const ButtonsRow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 34px;
  min-height: 60px;
`

const NoButton = styled(motion.button)`
  font-family: ${theme.fontUI};
  font-weight: 500;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.55);
  border: 1px solid ${theme.glassBorder};
  padding: 15px 30px;
  border-radius: 999px;
  position: relative;
`

function fireHearts() {
  confetti({
    particleCount: 40,
    spread: 70,
    startVelocity: 28,
    scalar: 0.9,
    origin: { y: 0.65 },
    colors: ['#ff8fab', '#e8c27a', '#fdf6ec'],
    shapes: ['circle'],
  })
}

export default function LoveQuestions({ onComplete }) {
  const [step, setStep] = useState(0)
  const [dodge, setDodge] = useState({ x: 0, y: 0 })

  const handleYes = () => {
    fireHearts()
    setDodge({ x: 0, y: 0 })
    if (step === questions.length - 1) {
      onComplete()
    } else {
      setStep((s) => s + 1)
    }
  }

  const handleDodge = () => {
    const x = Math.random() * 160 - 80
    const y = Math.random() * 60 - 30
    setDodge({ x, y })
  }

  return (
    <Stage>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card>
          <Dots>
            {questions.map((_, i) => (
              <Dot key={i} active={i <= step} />
            ))}
          </Dots>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <Script style={{ fontSize: 'clamp(28px, 6vw, 42px)' }}>{questions[step]}</Script>
            </motion.div>
          </AnimatePresence>

          <ButtonsRow>
            <PrimaryButton as={motion.button} whileTap={{ scale: 0.94 }} onClick={handleYes}>
              Sí 💕
            </PrimaryButton>
            <NoButton
              animate={{ x: dodge.x, y: dodge.y }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              onMouseEnter={handleDodge}
              onTouchStart={handleDodge}
              onClick={handleDodge}
            >
              No
            </NoButton>
          </ButtonsRow>
        </Card>
      </motion.div>
    </Stage>
  )
}
