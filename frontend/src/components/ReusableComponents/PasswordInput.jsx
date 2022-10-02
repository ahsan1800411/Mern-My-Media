import React from "react";

const PasswordInput = () => {
  return (
    <div
      className="flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded-3xl mb-4 shadow
       shadow-[#5BECC0] "
    >
      <div className="flex -mr-px justify-center w-15 p-4">
        <span className="flex items-center leading-normal bg-white rounded rounded-r-none text-xl px-2 whitespace-no-wrap text-gray-800">
          <i className="fas fa-lock"></i>
        </span>
      </div>
      <input
        type="password"
        className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto outline-none font-medium"
        placeholder="Password"
      />
      <div className="flex -mr-px">
        <span className="flex items-center leading-normal  rounded rounded-l-none border-0 px-6 whitespace-no-wrap text-gray-500">
          <i className="fas fa-eye-slash"></i>
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
