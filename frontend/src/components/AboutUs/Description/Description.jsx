import React from "react";
import WrapperMax from "../../ReusableComponents/WrapperMax/WrapperMax";
import AboutHeader from "../AboutHeader";
import PartOne from "./PartOne/PartOne";
import PartThree from "./PartThree/PartThree";
import PartTwo from "./PartTwo/PartTwo";

const Description = () => {
  return (
    <div className="bg-[#EDF2FF]">
      <AboutHeader />
      <WrapperMax className="pt-14">
        <PartOne />
        <PartTwo />
        <PartThree />
      </WrapperMax>
    </div>
  );
};

export default Description;
