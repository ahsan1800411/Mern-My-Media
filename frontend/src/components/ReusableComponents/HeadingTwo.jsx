import React from "react";

const HeadingTwo = ({ children, className = "" }) => {
  return (
    <h1
      className={`text-2xl sm:3xl lg:text-4xl font-semibold text-[#012354] ${className}`}
    >
      {children}
    </h1>
  );
};

export default HeadingTwo;
