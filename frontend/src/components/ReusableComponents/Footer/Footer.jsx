import React from "react";
import { Link } from "react-router-dom";
import WrapperMax from "./../WrapperMax/WrapperMax";
import facebook from "../../../assets/images/icons8-facebook (1).svg";
import instagram from "../../../assets/images/icons8-instagram.svg";
import twitter from "../../../assets/images/icons8-twitter.svg";
import HeadingThree from "../HeadingThree";

const Footer = ({className}) => {
  return (
    <section className={`bg-[#012054] ${className}`}>
      <WrapperMax className="flex flex-wrap pt-36 pb-12">
        <div className="flex-1">
          
          <p className="text-white font-thin text-lg mb-10 md:w-96">
            1.10.32 and 1.10.33 of "de Finibus Bonorum er Malorum"(The Extremes
            of Good and Evil) by Cicero.
          </p>
          <p className="text-white text-lg mb-4 font-thin">
            Join our news letter
          </p>
          <div className="flex mb-8 md:mb-20">
            <div className="relative">
              <div className="absolute top-4 left-3">
              {/* <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> */}
              <i className="fa text-gray-400 z-20 hover:text-gray-500"></i>
              </div>
              <input
                type="text"
                className="h-14 w-80 lg:w-96 pl-6 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                placeholder="Enter your email..."
              />
              <div className="absolute top-2 right-2">
                <button className="h-10 w-32 text-white rounded-lg bg-[#5BECC0]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-lg font-medium mb-10 md:mb-0">
            @ Copyrights 2022 Website          </p>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap">
            <div className="flex-1">
              <HeadingThree className="uppercase text-white">
                Company
              </HeadingThree>
              <div className="flex flex-col font-medium text-lg text-gray-400">
                <Link
                  to="#"
                  className="block mt-4 lg:inline-block lg:mt-0 hover:text-[#5BECC0] mb-3"
                >
                  About us
                </Link>
                <Link
                  to="/about-us"
                  className="block mt-4 lg:inline-block lg:mt-0 hover:text-[#5BECC0] mb-3"
                >
                  Blog
                </Link>
                <Link
                  to="/our-features"
                  className="block mt-4 lg:inline-block lg:mt-0 hover:text-[#5BECC0] mb-3"
                >
                  Careers
                </Link>
                <Link
                  to="/pricing"
                  className="block mt-4 lg:inline-block lg:mt-0 hover:text-[#5BECC0]"
                >
                  Contact Us
                </Link>
              </div>
              <div className="mt-12">
                <HeadingThree className="uppercase text-white">
                  Follow us
                </HeadingThree>
                <div className="flex gap-x-16 text-center">
                  <img src={facebook} className="w-10" alt="Facebook Icon" />
                  <img src={instagram} className="w-10" alt="Instagram Icon" />
                  <img src={twitter} className="w-10" alt="Twitter Icon" />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <HeadingThree className="uppercase text-white">
                Lorem Ipsum
              </HeadingThree>
              <div className="flex flex-col text-lg font-medium text-gray-400">
                <Link
                  to="#"
                  className="block mt-4 lg:inline-block lg:mt-0 hover:text-[#5BECC0] mb-3"
                >
                  Terms
                </Link>
                <Link
                  to="/about-us"
                  className="block mt-4 lg:inline-block lg:mt-0 hover:text-[#5BECC0] mb-3"
                >
                  Privacy
                </Link>
                <Link
                  to="/our-features"
                  className="block mt-4 lg:inline-block lg:mt-0 hover:text-[#5BECC0] mb-3"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </WrapperMax>
    </section>
  );
};

export default Footer;
