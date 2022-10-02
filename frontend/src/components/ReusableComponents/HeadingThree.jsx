import React from "react";

const HeadingThree = ({ children, className = "" }) => {
  return (
    <h1 className={`font-medium text-xl lg:text-2xl lg:mb-4  ${className}`}>
      {children}
    </h1>
  );
};

export default HeadingThree;
