import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export function Home() {
  return (
    <div>
      <h1>[홈페이지]</h1>
      <nav>
        <Link to="about">회사소개</Link>
        <Link to="events">이벤트</Link>
        <Link to="products">제품</Link>
        <Link to="contact">고객지원</Link>
      </nav>
    </div>
  )
}

export function About() {
  return (
    <div>
      <h1>[회사소개]</h1>
      <Outlet />
    </div>
  )
}

export function Services() {
  return (
    <section>
      <h2>Our Services</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praaesent libero. Sed
        cursus ante dapibus diam. Sed nisi.
      </p>
    </section>
  )
}

export function History() {
  return (
    <div>
      <h1>[History]</h1>
    </div>
  )
}

export function Location() {
  return (
    <div>
      <h1>[Location]</h1>
    </div>
  )
}

export function Events() {
  return (
    <div>
      <h1>[이벤트]</h1>
    </div>
  )
}

export function Products() {
  return (
    <div>
      <h1>[제품]</h1>
    </div>
  )
}

export function Contact() {
  return (
    <div>
      <h1>[고객지원]</h1>
    </div>
  )
}

export function Whoops404() {
  let location = useLocation()
  console.log(`location: ${JSON.stringify(location, null, 2)}`)
  return (
    <div>
      <h1>Resource not found at {location.pathname}</h1>
    </div>
  )
}
