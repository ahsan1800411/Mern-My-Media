import React from "react";
const ImagePart = ({ image, className = "" }) => {
  return (
    <div
      className={` xl:w-[800px] bg-gradient-to-b from-[white] to-[#01BEC3] lg:rounded-r-2xl text-center ${className}`}
    >
      <img src={image} className="mx-auto w-3/4" alt="" srcset="" />
    </div>
  );
};

export default ImagePart;
