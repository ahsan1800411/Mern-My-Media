import React from "react";

const WrapperMax = ({ className = "", children }) => {
  return (
    <div className={`container mx-auto px-6 2xl:px-10  ${className}`}>
      {children}
    </div>
  );
};

export default WrapperMax;
