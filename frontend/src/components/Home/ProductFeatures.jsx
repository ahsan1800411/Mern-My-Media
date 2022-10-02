import React from "react";
import WrapperMin from "../ReusableComponents/WrapperMin/WrapperMin";
import icon1 from "../../assets/images/Icon feather-check-circle.svg";
import HeadingOne from "../ReusableComponents/HeadingOne";
import ProductBox from "./../ReusableComponents/ProductBox/ProductBox";

const ProductFeatures = () => {
  return (
    <section id="#feature" className="bg-[#EDF2FF]">
      <WrapperMin>
        <div className="flex justify-center">
          <HeadingOne className="text-center mb-16">
            Product features
          </HeadingOne>
          <div className="flex"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <ProductBox icon={icon1} />
          <ProductBox icon={icon1} />
          <ProductBox icon={icon1} />
        </div>
      </WrapperMin>
    </section>
  );
};

export default ProductFeatures;
