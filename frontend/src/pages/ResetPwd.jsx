import React,{useState,useEffect} from "react";
import resetImg from "../assets/images/Save new pwd.svg";
import { Link ,useParams} from "react-router-dom";
import ForgetResetTemp from "../components/ReusableComponents/ForgetResetTemp/ForgetResetTemp";
import ImagePart from "../components/ForgetPwd/ImagePart";
import Footer from "../components/ReusableComponents/Footer/Footer";
import axios from 'axios';
const ResetPwd = () => {
  const parseJwt = (token) => {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };
  const params = useParams();
  let email = parseJwt(params.token).data.email;
  const [userData, setUserData] = useState({
    oldPassword: "",
    newPassword: "",
    email: email,
  });
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [togglePasswordNew, setTogglePasswordNew] = useState(false);
  const [togglePasswordConfirm, setTogglePasswordConfirm] = useState(false);
  const validatePassword = (value) => {
    const regex = new RegExp(/^(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,}$/);
    return {
      isValid: regex.test(value),
      message:
        "password must contain Min. 8 characters with letters and digits",
    };
  };
  useEffect(() => {
    const resultOldPassword = validatePassword(userData.oldPassword);
    const resultNewldPassword = validatePassword(userData.newPassword);
    let newFormValue = true;
    if (!resultOldPassword.isValid) {
      setPasswordFeedback(resultOldPassword.message);
      newFormValue &= false;
    } else {
      setPasswordFeedback("");
      newFormValue &= true;
    }
    if (!resultNewldPassword.isValid) {
      setPasswordFeedback(resultNewldPassword.message);
      newFormValue &= false;
    } else {
      setPasswordFeedback("");
      newFormValue &= true;
    }
    if (userData.newPassword !== userData.oldPassword) {
      setPasswordFeedback("Two passwords does not match");
      newFormValue &= false;
    }
    setFormValid(newFormValue);
  }, [userData]);

  const handleInputChange = (event) => {
    userData[event.target.name] = event.target.value;

    setUserData({ ...userData });
  };

  const handleResetPassword = (event) => {
    
    event.preventDefault();
    console.log("event", userData);
    axios
      .post(`http://localhost:5000/reset-password`, userData)
      .then(() => (window.location.pathname = "/login"))
      .catch(() => alert("Failed to register, please try again"));
  };
  return (
    <>
    <ForgetResetTemp>
      <div className="flex-1 py-10 px-6 order-2 lg:order-none sm:w-[600px] sm:mx-auto">
        <Link to="/login" className="font-semibold hidden lg:block mb-10">
          Back to login
        </Link>
        <div className="">
          <h1 className="text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-bold text-[#012054] mb-2">
            Reset Password
          </h1>
          <p className="text-gray-400 text-sm font-medium mb-8 lg:mb-14">
            Please choose your new password
          </p>
         
            <div className="mb-5">
              <h1 className="text-xl font-semibold text-[#012054] mb-2">
                New Password
              </h1>{" "}
              <input
                name="oldPassword"
                onChange={handleInputChange}
                type="password"
                placeholder="Enter your new password"
                className="rounded-2xl py-2 border border-[#012054] px-4 w-full"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#012054] mb-2">
                Confirm Password
              </h1>{" "}
              <input
                type="password"
                name="newPassword"
                onChange={handleInputChange}
                placeholder="Confirm your new password"
                className="rounded-2xl py-2 border border-[#012054]  px-4 w-full"
              />
            </div>

            <button
              
              className="inline-block w-56 text-center font-medium py-5 leading-none border
      rounded-full text-white border-[#012054] hover:border-transparent
      hover:text-white mt-5 xl:mt-20 bg-[#012054]"
      onClick={handleResetPassword}  >
              Save new password
            </button>
        
        </div>
      </div>
      <ImagePart image={resetImg} className="" />      
    </ForgetResetTemp>
    <Footer />
    </>
  );
};

export default ResetPwd;
