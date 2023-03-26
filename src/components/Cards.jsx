import React from 'react'
import Card from './Card'

const Cards = () => {
  return (
    <div className='w-full py-[5rem] px-4 bg-black'>
        <h2 className='md:text-5xl sm:text-4xl text-xl font-bold py-4 text-white flex justify-center'>Verify Projects</h2>
       
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <Card/>
          <Card/>
          <Card/>
          
          
      </div>
    </div>
  )
}

export default Cards