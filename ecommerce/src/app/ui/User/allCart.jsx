import React from 'react';

export default function AllCartUI() {
  return (
    <div className='container flex flex-wrap overflow-y-scroll h-4/5'> {/* Adjusted height */}
      {Array.from({ length: 8 }).map((_, index) => (  // Increased number of cards for better visibility
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img 
            className="w-full h-48 object-cover" // Keeps the image height
            src="path/to/image.jpg" 
            alt="Tawilind Image" 
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
          </div>
        </div>
      ))}
    </div>
  );
}
