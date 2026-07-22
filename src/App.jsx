import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import FloatingHearts from './components/FloatingHearts.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import Intro from './components/Intro.jsx'
import LoveMeter from './components/LoveMeter.jsx'
import LoveQuestions from './components/LoveQuestions.jsx'
import SurpriseBox from './components/SurpriseBox.jsx'

export default function App() {
  const [step, setStep] = useState('intro')
  const musicRef = useRef(null)

  const goTo = (next) => setStep(next)

  return (
    <>
      <FloatingHearts />
      <MusicPlayer ref={musicRef} />

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <Intro
            key="intro"
            onEnter={() => {
              musicRef.current?.start()
              goTo('meter')
            }}
          />
        )}
        {step === 'meter' && <LoveMeter key="meter" onComplete={() => goTo('questions')} />}
        {step === 'questions' && (
          <LoveQuestions key="questions" onComplete={() => goTo('box')} />
        )}
        {step === 'box' && <SurpriseBox key="box" />}
      </AnimatePresence>
    </>
  )
}
