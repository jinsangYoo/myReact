import React from 'react'
import './App.css'
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import Paperbase from './themes/paperbase/Paperbase'
import AppLayout from './components/navigator/AppLayout'

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
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="paperbase" element={<Paperbase />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/paperbase">Paperbase</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

function NoMatch() {
  return (
    <div>
      <h2>oops! 404.</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}

export default App
