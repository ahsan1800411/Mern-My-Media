import React from "react";

const Button = ({ children, color, className = "" }) => {
  return (
    <a
      href="#id"
      className={`inline-block w-56 text-center font-semibold py-5 leading-none border
      rounded-full text-white text-lg border-[${color}] hover:border-transparent
      hover:text-white mt-20 bg-[${color}] ${className}`}
    >
      {children}
    </a>
  );
};

export default Button;
