import React from "react";

const InputWithIcon = ({ type = "text", placeholder, icon }) => {
  return (
    <div
      className="flex flex-wrap items-stretch w-full relative bg-white items-center rounded-3xl mb-6 pr-10 shadow
       shadow-[#5BECC0] "
    >
      <div className="flex -mr-px justify-center w-15 py-3 px-2">
        <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-xl text-gray-800">
          <i className={`fas ${icon}`}></i>
        </span>
      </div>
      <input
        type={type}
        className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none font-medium px-3 self-center relative outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputWithIcon;
