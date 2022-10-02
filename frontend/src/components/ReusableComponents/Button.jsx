import React from "react";

const Button = ({ to, children, className }) => {
  return (
    <a
      href={to}
      className={`text-lg inline-block text-center font-semibold py-3 leading-none border
        rounded-full  ${className}`}
    >
      {children}
    </a>
  );
};

export default Button;
