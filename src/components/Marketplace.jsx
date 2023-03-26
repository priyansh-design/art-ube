import React from 'react';
import Card from './Card';

const Marketplace = () => {
  return (
    <div className='w-full py-[2rem] px-4 bg-white pb-100'>
        <h2 className='md:text-5xl sm:text-4xl text-xl font-bold py-4 flex justify-center'>Marketplace</h2>
        
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  );
};

export default Marketplace;
