import React from 'react'
import './Homepage.css'
import { InputForm } from "./components/InputForm";

const Homepage = () => {
  return (
    <main className='mainHomeContainer'>
      <h1 className='headingHome'>URL Shortener</h1>
      <InputForm />
    </main>
  )
}

export default Homepage

