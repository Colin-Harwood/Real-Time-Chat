import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <>
    <div class="w-100 h-screen flex justify-center items-center grid grid-cols-2">
      <div class="flex items-center justify-center h-full">
        <div class="h-1/2 w-1/2 bg-cream text-center">
          <h1 class="text-8xl font-bold text-purple">Join</h1>
        </div>
      </div>
      <div class="flex items-center justify-center h-full">
        <div class="h-1/2 w-1/2 bg-cream text-center">
          <h1 class="text-8xl font-bold text-purple">Create</h1>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
