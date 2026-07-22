import React from 'react'
import ReactDOM from 'react-dom/client'
import { Global, css } from '@emotion/react'
import App from './App.jsx'
import { theme } from './theme.js'

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
  }
  body {
    background: radial-gradient(circle at 50% 0%, ${theme.bgDeep} 0%, ${theme.bg} 60%, #05010a 100%);
    color: ${theme.ivory};
    font-family: ${theme.fontUI};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  #root {
    min-height: 100%;
  }
  button {
    font-family: ${theme.fontUI};
    border: none;
    background: none;
    cursor: pointer;
  }
  select {
    font-family: ${theme.fontUI};
  }
  ::selection {
    background: ${theme.rose};
    color: ${theme.bg};
  }
`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>
)
