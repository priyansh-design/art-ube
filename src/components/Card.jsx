import React from 'react'
import Single from '../assets/painting.jpg'

const Card = () => {
  return (
    <div className='w-full shadow-xl flex flex-col  p-2 my-4 rounded-lg hover:scale-105 hover:bg-grey duration-300 border border-grey-900 bg-white h-full '>
              
              
              <img className='w-full mx-auto rounded-lg bg-white h-[60%]' src={Single} alt="/" />
             
              <div className='text-center font-medium inline-block'>
                  <p className='py-2 border-b mx-8 mt-3'>The Starry Night</p>
                  <p className='py-2 border-b mx-8 mt-3'>$250</p>
                  
              </div>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium mt-4 mx-auto px-6 py-3  hover:bg-black hover:text-[#00df9a]'>Know More</button>
          </div>
  )
}

export default Card