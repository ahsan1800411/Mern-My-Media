import React from "react";

const OfferText = ({ text, className = "" }) => {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <i className={`fas fa-envelope`}></i>
      <p className="text-sm lg:text-[15px] font-medium text-[#012054]">
        {text}
      </p>
    </div>
  );
};

export default OfferText;
