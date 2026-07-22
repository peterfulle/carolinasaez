import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import FloatingHearts from './components/FloatingHearts.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import Intro from './components/Intro.jsx'
import LoveMeter from './components/LoveMeter.jsx'
import LoveQuestions from './components/LoveQuestions.jsx'
import SurpriseBox from './components/SurpriseBox.jsx'
import Vows from './components/Vows.jsx'
import Finale from './components/Finale.jsx'

export default function App() {
  const [step, setStep] = useState('intro')
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const goTo = (next) => setStep(next)

  const startAmbient = () => {
    const el = audioRef.current
    if (!el) return
    el.volume = 0.22
    el.currentTime = 0
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }

  const swellFinale = () => {
    const el = audioRef.current
    if (!el) return
    el.currentTime = 0
    el.volume = 0.85
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/proposal-song.mp3"
        preload="auto"
        onEnded={(e) => {
          if (step === 'finale') return
          e.currentTarget.currentTime = 0
          e.currentTarget.play().catch(() => {})
        }}
      />
      <FloatingHearts />
      <MusicPlayer audioRef={audioRef} playing={playing} />

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <Intro
            key="intro"
            onEnter={() => {
              startAmbient()
              goTo('meter')
            }}
          />
        )}
        {step === 'meter' && <LoveMeter key="meter" onComplete={() => goTo('questions')} />}
        {step === 'questions' && (
          <LoveQuestions key="questions" onComplete={() => goTo('box')} />
        )}
        {step === 'box' && (
          <SurpriseBox key="box" onYes={() => goTo('vows')} />
        )}
        {step === 'vows' && (
          <Vows
            key="vows"
            onComplete={() => {
              swellFinale()
              goTo('finale')
            }}
          />
        )}
        {step === 'finale' && <Finale key="finale" audioRef={audioRef} />}
      </AnimatePresence>
    </>
  )
}
