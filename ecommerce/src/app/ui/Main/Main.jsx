"use client"
import React from 'react';
import Typewriter from 'typewriter-effect';

const Main = () => {
  return (
    <div className='flex h-screen items-center justify-between'>
      <div className='font-bold text-6xl mb-10 ml-10 w-3/4'>
      <h1>
       Hii
        </h1>
        <h1>
          <Typewriter
            options={{
              strings: [ "Let's Shop With Us"],
              autoStart: true,
              loop: true,
              delay: 75,
            }}
          />
        </h1>
      </div>

      <div className='w-1/2 mb-12'>
        <img src="./bg.jpg" alt="" style={{ height: '700px', width: 'auto' }} />
      </div>
    </div>
  );
}

export default Main;
