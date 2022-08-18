import React from 'react'
import './App.css'
import { Routes, Route, Link, Outlet } from 'react-router-dom'

function App() {
  const isPro = process.env.NODE_ENV === 'production' || false
  const isDev = process.env.NODE_ENV === 'development' || false
  const isTest = process.env.NODE_ENV === 'test' || false

  return (
    <div>
      <h1>Basic Example</h1>

      <p>
        isPro: {String(isPro)}, isDev: {String(isDev)}, isTest: {String(isTest)}
      </p>
      <p>
        NODE_ENV: &gt;&gt;{process.env.NODE_ENV}&lt;&lt;, REACT_APP_MODE: &gt;&gt;{process.env.REACT_APP_MODE}
        &lt;&lt;
      </p>
      <p>
        This example demonstrates some of the core features of React Router including nested{' '}
        <code>&lt;Route&gt;</code>s, <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a
        &quot;*&quot; route (aka &quot;splat route&quot;) to render a &quot;not found&quot; page when someone
        visits an unrecognized URL.
      </p>

      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
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
