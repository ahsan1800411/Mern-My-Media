import React from "react";

const HeadlingOne = ({ className = "", children }) => {
  return (
    <h1
      className={`text-2xl font-bold md:text-4xl xl:text-6xl  ${className} text-[#012354]`}
    >
      {children}
    </h1>
  );
};

export default HeadlingOne;
