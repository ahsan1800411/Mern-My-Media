import React from 'react';

const ImageSection = ({ image, title }) => {
  return (
    <div className='flex-1 bg-gradient-to-b from-[white] to-[#01BEC3] lg:rounded-r-[60px] text-center p-12 lg:py-20 lg:px-20'>
      <img src={image} className='mx-auto' alt='' />
      <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold mt-5 mb-4 text-[#012054]'>
        {title}
      </h1>
      <p className='px-5 sm:text-lg lg:text-lg font-semibold text-[#012054]'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit adipisicing. Et,
        quasi?
      </p>
    </div>
  );
};

export default ImageSection;
