import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from '@emotion/styled'
import confetti from 'canvas-confetti'
import { Stage, Card, Script, Serif } from './Shell.jsx'
import { theme } from '../theme.js'
import { PHOTOS } from '../data/photos.js'
import { LYRICS } from '../data/lyrics.js'

const WEDDING_DATE = new Date('2027-07-24T00:00:00')

const SlideWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: #05010a;
`

const SlideImg = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${(props) => props.$position || 'center 30%'};
`

const Vignette = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(5, 1, 10, 0.55) 0%,
    rgba(5, 1, 10, 0.15) 30%,
    rgba(5, 1, 10, 0.35) 65%,
    rgba(5, 1, 10, 0.85) 100%
  );
`

const SubtitleWrap = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 9%;
  z-index: 2;
  display: flex;
  justify-content: center;
  padding: 0 24px;
  text-align: center;
`

const SubtitleText = styled(motion.p)`
  font-family: ${theme.fontSerif};
  font-style: italic;
  font-size: clamp(20px, 4vw, 32px);
  color: ${theme.ivory};
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.8), 0 0 40px rgba(232, 194, 122, 0.25);
  max-width: 760px;
`

const HeaderWrap = styled.div`
  position: fixed;
  top: 8%;
  left: 0;
  right: 0;
  z-index: 2;
  text-align: center;
  padding: 0 24px;
`

function filmReelBurst() {
  const colors = ['#ff8fab', '#e8c27a', '#fdf6ec', '#e0507a']

  // "Arroz": ráfaga de partículas pequeñas y claras, como al salir de la boda.
  confetti({
    particleCount: 120,
    spread: 130,
    startVelocity: 38,
    gravity: 0.9,
    scalar: 0.55,
    origin: { y: 0.35 },
    colors: ['#fdf6ec', '#f3dfb0'],
    shapes: ['circle'],
  })

  // Confeti clásico dorado/rosa.
  confetti({
    particleCount: 90,
    spread: 110,
    startVelocity: 42,
    origin: { y: 0.4 },
    colors,
    shapes: ['square', 'circle'],
    scalar: 0.9,
  })

  // Corazones y destellos flotando hacia arriba.
  try {
    const heart = confetti.shapeFromText({ text: '❤️', scalar: 3.2 })
    const sparkle = confetti.shapeFromText({ text: '✨', scalar: 3 })
    const ring = confetti.shapeFromText({ text: '💍', scalar: 3.4 })

    confetti({
      particleCount: 26,
      spread: 100,
      startVelocity: 32,
      gravity: 0.6,
      origin: { y: 0.45 },
      shapes: [heart, sparkle],
      scalar: 1,
    })

    setTimeout(() => {
      confetti({
        particleCount: 10,
        spread: 70,
        startVelocity: 28,
        gravity: 0.6,
        origin: { y: 0.4 },
        shapes: [ring],
        scalar: 1,
      })
    }, 350)
  } catch {
    // Si el navegador no soporta shapeFromText, el confeti clásico ya cubrió el destello.
  }
}

function useActiveLyric(audioRef) {
  const [index, setIndex] = useState(-1)
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onTime = () => {
      const t = el.currentTime
      let i = -1
      for (let k = 0; k < LYRICS.length; k++) {
        if (t >= LYRICS[k].start) i = k
        else break
      }
      setIndex(i)
    }
    el.addEventListener('timeupdate', onTime)
    return () => el.removeEventListener('timeupdate', onTime)
  }, [audioRef])
  return index >= 0 ? LYRICS[index].text : ''
}

export default function Finale({ audioRef }) {
  const [ended, setEnded] = useState(false)
  const [slide, setSlide] = useState(0)
  const activeLine = useActiveLyric(audioRef)

  const formattedDate = useMemo(
    () =>
      WEDDING_DATE.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
    []
  )

  useEffect(() => {
    filmReelBurst()
  }, [])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onEnded = () => setEnded(true)
    el.addEventListener('ended', onEnded)
    return () => el.removeEventListener('ended', onEnded)
  }, [audioRef])

  useEffect(() => {
    const duration = audioRef.current?.duration || 176
    const perSlide = (duration / PHOTOS.length) * 1000
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % PHOTOS.length)
    }, perSlide)
    return () => clearInterval(id)
  }, [audioRef])

  useEffect(() => {
    if (!ended) return
    const id = setInterval(() => {
      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() * 0.4 },
        colors: ['#ff8fab', '#e8c27a', '#fdf6ec', '#e0507a'],
      })
    }, 900)
    return () => clearInterval(id)
  }, [ended])

  return (
    <>
      <SlideWrap>
        <AnimatePresence>
          <SlideImg
            key={slide}
            src={PHOTOS[slide].src}
            $position={PHOTOS[slide].position}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.16 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: 13, ease: 'linear' } }}
          />
        </AnimatePresence>
      </SlideWrap>
      <Vignette />

      <HeaderWrap>
        <Script style={{ fontSize: 'clamp(30px, 6vw, 46px)' }}>¡Dijiste que SÍ! 💍</Script>
      </HeaderWrap>

      <AnimatePresence mode="wait">
        <SubtitleWrap>
          <SubtitleText
            key={activeLine}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {activeLine}
          </SubtitleText>
        </SubtitleWrap>
      </AnimatePresence>

      <AnimatePresence>
        {ended && (
          <Stage style={{ position: 'fixed', zIndex: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Card>
                <Script>Carolina Sáez & Peter Fulle</Script>
                <div style={{ height: 10 }} />
                <Serif>Nos casamos el {formattedDate} 💐</Serif>
                <div style={{ height: 8 }} />
                <Serif style={{ fontSize: 16, opacity: 0.85 }}>
                  Para siempre empieza hoy. ✨💗
                </Serif>
              </Card>
            </motion.div>
          </Stage>
        )}
      </AnimatePresence>
    </>
  )
}
