import React from 'react'
import NavBar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Features from '../components/Features'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Story from '../components/Story'

const HomePage = () => {
  return (
    <>
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
    </>
  )
}

export default HomePage