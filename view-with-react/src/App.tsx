import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import DefaultLayout from './components/layout/DefaultLayout'

function App() {
  const isPro = process.env.NODE_ENV === 'production' || false
  const isDev = process.env.NODE_ENV === 'development' || false
  const isTest = process.env.NODE_ENV === 'test' || false
  console.log(`isPro: ${String(isPro)}, isDev: ${String(isDev)}, isTest: ${String(isTest)}`)
  console.log(
    `NODE_ENV: &gt;&gt;${process.env.NODE_ENV}&lt;&lt;, REACT_APP_MODE: &gt;&gt;${process.env.REACT_APP_MODE}&lt;&lt;`
  )

  return (
    <div>
      <Router>
        <DefaultLayout />
      </Router>
    </div>
  )
}

export default App
