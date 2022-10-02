import React from "react";
import WrapperMax from "../../ReusableComponents/WrapperMax/WrapperMax";
import Img1 from "../../../assets/images/Eng-1 - Copy.jpg";

import Member from "./Member/Member";
import HeadingTwo from "../../ReusableComponents/HeadingTwo";
// import linkedin from "../../../assets/images/linkedin-big-logo-svgrepo-com.svg";
const Team = () => {
  return (
    <div className="mb-12 bg-[#EDF2FF]">
      <WrapperMax>
        <div className="mb-4 lg:mb-10 ">
          <HeadingTwo>Our Team</HeadingTwo>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 space-y-2">
          <Member
            Img1={Img1}
            name="Lorem Ipsum"
            role="Founder & CEO"
            description="Lorem, ipsum dolor sit amet elit. Itaque, nemo?"
            linkedinUrl="#"
            twitterUrl="#"
          ></Member>
          <Member
            Img1={Img1}
            name="Lorem Ipsum"
            role="Founder & CEO"
            description="Lorem, ipsum dolor sit amet elit. Itaque, nemo?"
            linkedinUrl="#"
            twitterUrl="#"
          ></Member>
          <Member
            Img1={Img1}
            name="Lorem Ipsum"
            role="Founder & CEO"
            description="Lorem, ipsum dolor sit amet elit. Itaque, nemo?"
            linkedinUrl="#"
            twitterUrl="#"
          ></Member>
          <Member
            Img1={Img1}
            name="Lorem Ipsum"
            role="Founder & CEO"
            description="Lorem, ipsum dolor sit amet elit. Itaque, nemo?"
            linkedinUrl="#"
            twitterUrl="#"
          ></Member>
          <Member
            Img1={Img1}
            name="Lorem Ipsum"
            role="Founder & CEO"
            description="Lorem, ipsum dolor sit amet elit. Itaque, nemo?"
            linkedinUrl="#"
            twitterUrl="#"
          ></Member>
          <Member
            Img1={Img1}
            name="Lorem Ipsum"
            role="Founder & CEO"
            description="Lorem, ipsum dolor sit amet elit. Itaque, nemo?"
            linkedinUrl="#"
            twitterUrl="#"
          ></Member>
        </div>
      </WrapperMax>
    </div>
  );
};

export default Team;
