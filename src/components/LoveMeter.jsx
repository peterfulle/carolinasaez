import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styled from '@emotion/styled'
import { Stage, Card, Script, Serif, PrimaryButton, GhostButton } from './Shell.jsx'
import { theme } from '../theme.js'

const options = [
  { value: '1', label: '1', reply: '¿Solo un 1? Vamos… puedo notar que sientes más que eso 😅', unlock: false },
  { value: '10', label: '10', reply: 'Mejor… pero mi corazón sabe que sientes más 💭', unlock: false },
  { value: '100', label: '100', reply: '¡Así me gusta! Aunque… creo que hay un número mejor ✨', unlock: false },
  { value: 'infinito', label: 'Infinito ∞', reply: '¡Esa es la respuesta correcta! Tal como te amo yo a ti. ∞💗', unlock: true },
]

const Select = styled.select`
  width: 100%;
  padding: 16px 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid ${theme.glassBorder};
  color: ${theme.ivory};
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  text-align-last: center;
  appearance: none;
  cursor: pointer;

  option {
    background: ${theme.bgDeep};
    color: ${theme.ivory};
  }
`

const SelectWrap = styled.div`
  position: relative;
  margin: 30px 0 8px;

  &::after {
    content: '▾';
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.gold};
    pointer-events: none;
  }
`

const ReplyBubble = styled(motion.div)`
  margin-top: 22px;
  font-family: ${theme.fontSerif};
  font-style: italic;
  font-size: 18px;
  color: ${theme.goldSoft};
  min-height: 30px;
`

export default function LoveMeter({ onComplete }) {
  const [selected, setSelected] = useState('')
  const current = options.find((o) => o.value === selected)

  return (
    <Stage>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card>
          <Script style={{ fontSize: 'clamp(34px, 7vw, 54px)' }}>¿Cuánto me amas?</Script>
          <div style={{ height: 10 }} />
          <Serif>Elige del desplegable, sinceramente.</Serif>

          <SelectWrap>
            <Select value={selected} onChange={(e) => setSelected(e.target.value)}>
              <option value="" disabled>
                Selecciona un número…
              </option>
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </SelectWrap>

          <AnimatePresence mode="wait">
            {current && (
              <ReplyBubble
                key={current.value}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {current.reply}
              </ReplyBubble>
            )}
          </AnimatePresence>

          <div style={{ height: 30 }} />

          {current?.unlock ? (
            <PrimaryButton as={motion.button} whileTap={{ scale: 0.96 }} onClick={onComplete}>
              Continuar ∞
            </PrimaryButton>
          ) : (
            <GhostButton disabled={!current} onClick={() => setSelected('')}>
              {current ? 'Intentar de nuevo 😏' : 'Elige una opción'}
            </GhostButton>
          )}
        </Card>
      </motion.div>
    </Stage>
  )
}
