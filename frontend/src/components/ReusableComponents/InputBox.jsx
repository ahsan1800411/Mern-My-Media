import React from 'react';

const InputBox = ({
  placeholder = '',
  className = 'rounded',
  type = 'text',
  value,
  onChange,
}) => {
  return (
    <input
      className={`appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] ${className}`}
      id='grid-last-name'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputBox;
