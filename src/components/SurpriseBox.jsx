import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import styled from '@emotion/styled'
import { Stage, Card, Script, Serif, PrimaryButton } from './Shell.jsx'
import { theme } from '../theme.js'

const WEDDING_DATE = new Date('2027-07-24T00:00:00')

function useCountdown(target) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(id)
  }, [])
  const diffMs = Math.max(0, target - now)
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24)
  return { days, hours }
}

function fireworks() {
  const colors = ['#ff8fab', '#e8c27a', '#fdf6ec', '#e0507a']
  const end = Date.now() + 1600
  ;(function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 65, origin: { x: 0 }, colors })
    confetti({ particleCount: 6, angle: 120, spread: 65, origin: { x: 1 }, colors })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
  confetti({ particleCount: 140, spread: 100, startVelocity: 45, origin: { y: 0.6 }, colors })
}

const BoxWrap = styled(motion.div)`
  position: relative;
  width: 180px;
  height: 150px;
  margin: 20px auto 10px;
  cursor: pointer;
`

const Lid = styled(motion.div)`
  position: absolute;
  top: 0;
  left: -10px;
  right: -10px;
  height: 46px;
  background: linear-gradient(135deg, ${theme.roseDeep}, ${theme.rose});
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(224, 80, 122, 0.4);
  z-index: 2;
`

const RibbonV = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 16px;
  transform: translateX(-50%);
  background: ${theme.gold};
  z-index: 3;
`

const Base = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 104px;
  background: linear-gradient(160deg, #c93f68, ${theme.roseDeep});
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`

const Bow = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  z-index: 4;
`

const Glow = styled(motion.div)`
  position: absolute;
  inset: -40px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(232, 194, 122, 0.5), transparent 70%);
  z-index: 1;
`

const CountdownRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 26px;
  margin: 22px 0 6px;
`

const CountdownNum = styled.div`
  font-family: ${theme.fontUI};
  font-size: 30px;
  font-weight: 700;
  color: ${theme.goldSoft};
`

const CountdownLabel = styled.div`
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 2px;
`

const CoupleFrame = styled(motion.div)`
  width: 190px;
  height: 230px;
  margin: 4px auto 18px;
  border-radius: 16px;
  padding: 6px;
  background: linear-gradient(145deg, ${theme.goldSoft}, ${theme.gold});
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.35);
  transform: rotate(-2deg);
`

const CoupleImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  border-radius: 11px;
  display: block;
`

export default function SurpriseBox({ onYes }) {
  const [phase, setPhase] = useState('closed')
  const { days, hours } = useCountdown(WEDDING_DATE)

  const formattedDate = useMemo(
    () =>
      WEDDING_DATE.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    []
  )

  const openBox = () => {
    if (phase !== 'closed') return
    setPhase('opening')
    fireworks()
    setTimeout(() => setPhase('revealed'), 900)
  }

  return (
    <Stage>
      <AnimatePresence mode="wait">
        <motion.div
          key="box-scene"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
              {phase !== 'revealed' && (
                <>
                  <Script style={{ fontSize: 'clamp(28px, 6vw, 40px)' }}>Una última sorpresa…</Script>
                  <Serif>Toca la cajita cuando estés lista 🎁</Serif>

                  <BoxWrap
                    onClick={openBox}
                    animate={
                      phase === 'closed'
                        ? { rotate: [0, -3, 3, -3, 0] }
                        : { scale: [1, 1.15, 0], opacity: [1, 1, 0] }
                    }
                    transition={
                      phase === 'closed'
                        ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.7 }
                    }
                  >
                    <Glow
                      animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Bow>🎀</Bow>
                    <Lid
                      animate={phase === 'opening' ? { y: -60, rotate: -25, opacity: 0 } : {}}
                      transition={{ duration: 0.6 }}
                    />
                    <Base />
                    <RibbonV />
                  </BoxWrap>
                </>
              )}

              {phase === 'revealed' && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <CoupleFrame
                    initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
                    animate={{ opacity: 1, scale: 1, rotate: -2 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <CoupleImg src="/photos/photo-13.jpg" alt="Peter y Carolina" />
                  </CoupleFrame>

                  <Script>Carolina Sáez,</Script>
                  <Script style={{ fontSize: 'clamp(32px, 7vw, 50px)' }}>
                    ¿Quieres casarte conmigo?
                  </Script>
                  <div style={{ height: 14 }} />
                  <Serif>Nos casamos el {formattedDate} 💐</Serif>
                  <Serif style={{ fontSize: 15, opacity: 0.8, marginTop: 4 }}>
                    Un 24 de julio, en pleno invierno — la excusa perfecta para abrazarnos
                    más fuerte. No se me ocurre mejor fecha para empezar nuestra vida de casados.
                  </Serif>

                  <CountdownRow>
                    <div>
                      <CountdownNum>{days}</CountdownNum>
                      <CountdownLabel>días</CountdownLabel>
                    </div>
                    <div>
                      <CountdownNum>{hours}</CountdownNum>
                      <CountdownLabel>horas</CountdownLabel>
                    </div>
                  </CountdownRow>
                  <Serif style={{ fontSize: 16, opacity: 0.85 }}>
                    Un año más para amarte de cerca, y toda una vida para amarte para siempre.
                  </Serif>

                  <div style={{ height: 30 }} />
                  <PrimaryButton as={motion.button} whileTap={{ scale: 0.95 }} onClick={onYes}>
                    Sí, quiero 💍
                  </PrimaryButton>
                </motion.div>
              )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </Stage>
  )
}
