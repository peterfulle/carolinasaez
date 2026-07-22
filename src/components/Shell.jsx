import styled from '@emotion/styled'
import { theme } from '../theme.js'

export const Stage = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1;
`

export const Card = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;
  background: ${theme.glass};
  border: 1px solid ${theme.glassBorder};
  border-radius: 28px;
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  padding: 48px 40px;
  text-align: center;
`

export const Script = styled.h1`
  font-family: ${theme.fontScript};
  font-size: clamp(40px, 8vw, 68px);
  color: ${theme.goldSoft};
  font-weight: 400;
  line-height: 1.15;
  text-shadow: 0 2px 24px rgba(232, 194, 122, 0.35);
`

export const Serif = styled.p`
  font-family: ${theme.fontSerif};
  font-size: clamp(19px, 3vw, 24px);
  color: ${theme.ivory};
  line-height: 1.5;
  font-style: italic;
`

export const PrimaryButton = styled.button`
  font-family: ${theme.fontUI};
  font-weight: 600;
  letter-spacing: 0.02em;
  font-size: 16px;
  color: #2a1305;
  background: linear-gradient(135deg, ${theme.goldSoft}, ${theme.gold});
  padding: 16px 38px;
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(232, 194, 122, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 36px rgba(232, 194, 122, 0.5);
  }
  &:active {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`

export const GhostButton = styled.button`
  font-family: ${theme.fontUI};
  font-weight: 500;
  font-size: 15px;
  color: ${theme.ivory};
  background: transparent;
  border: 1px solid ${theme.glassBorder};
  padding: 15px 34px;
  border-radius: 999px;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`

export const Dots = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 22px;
`

export const Dot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${(props) => (props.active ? theme.gold : 'rgba(255,255,255,0.2)')};
  transition: background 0.3s ease, transform 0.3s ease;
  transform: ${(props) => (props.active ? 'scale(1.3)' : 'scale(1)')};
`
