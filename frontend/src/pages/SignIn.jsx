import React from "react";
import SignCreateTemp from "../components/ReusableComponents/SignCreateTemp/SignCreateTemp";
import ImageSection from "../components/SignInCreateAccount/ImageSection/ImageSection";
import SigninInputSection from "../components/SignInCreateAccount/InputSection/SigninInputSection";
import loginImage from "../assets/images/Login.svg";

const SignIn = () => {
  return (
    <SignCreateTemp>
      <SigninInputSection />
      <ImageSection image={loginImage} title="Welcome Back" />
    </SignCreateTemp>
  );
};

export default SignIn;
