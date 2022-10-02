import React from "react";
import SignCreateTemp from "../components/ReusableComponents/SignCreateTemp/SignCreateTemp";
import ImageSection from "../components/SignInCreateAccount/ImageSection/ImageSection";
import createImg from "../assets/images/Register.svg";
import CreateInputSection from "../components/SignInCreateAccount/InputSection/CreateInputSection";
import Footer from "../components/ReusableComponents/Footer/Footer";

const CreateAccount = () => {
  return (
    <SignCreateTemp>
      <CreateInputSection />
      <ImageSection image={createImg} title="Glad to see you" />
    </SignCreateTemp>
  );
};

export default CreateAccount;
