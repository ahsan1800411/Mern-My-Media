import React from "react";

const ProductBox = ({ icon }) => {
  return (
    <>
      <div className="z-[1000] mx-auto mb-14">
        <div className="relative z-[1000]">
          <div className=" z-[1000] bg-white py-14 px-5 w-[310px] h-[350px] shadow-sm shadow-[#012054] rounded-[15%]">
            <div className=" z-[1000] w-[130px] h-[130px] rounded-full bg-blue-100 p-10 mx-auto mb-8">
              <img src={icon} className="" alt="" srcset="" />
            </div>
            <h1 className="text-lg font-bold mb-3 text-gray-600">Feature 01</h1>
            <p className="text-lg text-gray-600 font-medium">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div
            className="-z-10 absolute -bottom-3 -left-2.5
       bg-[#053D9A] py-14 px-5 w-[330px] h-[175px] shadow-sm shadow-[#012054] rounded-[20%]"
          ></div>
        </div>
      </div>
    </>
  );
};

export default ProductBox;
