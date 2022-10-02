import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputWithIcon from '../../ReusableComponents/InputWithIcon/InputWithIcon';
import PasswordInput from '../../ReusableComponents/PasswordInput';
import HeadingTwo from '../../ReusableComponents/HeadingTwo';
import axios from 'axios';

const SigninInputSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };
  const handlelogin = async (evt) => {
    evt.preventDefault();
    if (evt.type === 'click') {
      userData.email = email;
      userData.password = password;
      await axios
        .post(`http://localhost:5000/login`, userData)
        .then((response) => {
          if (response && response.data.result === 'no users found')
            return alert('Invalid User Name or Password');
          else {
            localStorage.setItem('user', JSON.stringify(response.data.result));
            if (response?.data.result.role === 'user') {
              navigate('/user-dashboard');
            } else {
              navigate('/dashboard');
            }
          }
        });
    }
  };

  return (
    <div className='flex-1 p-10 order-2 lg:order-none sm:w-[600px] mx-auto'>
      <div>
        <div className='mb-8 text-center'>
          <HeadingTwo className='mb-4 font-bold'>Hello</HeadingTwo>
          <p className='font-medium text-[#012054] text-lg'>
            Sign in to your <span className='font-semibold'>Website</span>{' '}
            account
          </p>
        </div>
        <form class='space-y-8 '>
          <div
            className='flex flex-wrap items-stretch w-full relative bg-white items-center rounded-3xl mb-6 pr-10 shadow
       shadow-[#5BECC0] '
          >
            <div className='flex justify-center px-2 py-3 -mr-px w-15'>
              <span className='flex items-center px-3 text-xl leading-normal text-gray-800 bg-white border-0 rounded rounded-r-none'>
                <i className='fas fa-envelope'></i>
              </span>
            </div>
            <input
              className='relative self-center flex-1 flex-auto flex-grow flex-shrink w-px h-10 px-3 font-medium leading-normal border-0 rounded rounded-l-none outline-none border-grey-light'
              type='email'
              placeholder='enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <i class="fa fa-user icon"></i>
          <input
            type="text"
            placeholder="enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br> */}
          <div
            className='flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded-3xl mb-4 shadow
       shadow-[#5BECC0] '
          >
            <div className='flex justify-center px-2 py-3 -mr-px w-15'>
              <span className='flex items-center px-3 text-xl leading-normal text-gray-800 bg-white border-0 rounded rounded-r-none'>
                <i className='fas fa-lock'></i>
              </span>
            </div>
            <input
              className='relative self-center flex-1 flex-auto flex-grow flex-shrink w-px h-10 px-3 font-medium leading-normal border-0 rounded rounded-l-none outline-none border-grey-light'
              type={passwordType}
              placeholder='enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='flex -mr-px' onClick={togglePassword}>
              <span className='flex items-center px-4 leading-normal text-gray-500 whitespace-no-wrap border-0 rounded rounded-l-none'>
                {/* <i className="fas fa-eye-slash"></i> */}
                {passwordType === 'password' ? (
                  <i className='fas fa-eye-slash'></i>
                ) : (
                  <i className='fas fa-eye'></i>
                )}
              </span>
            </div>
          </div>
          {/* <i class="fa fa-user icon"></i>
          <input
            type="password"
            placeholder="enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}

          <div class='flex items-start'>
            <div class='flex items-start'>
              <div class='flex items-center h-5'>
                <input
                  id='remember'
                  aria-describedby='remember'
                  type='checkbox'
                  class='bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded '
                  required=''
                />
              </div>
              <div class='text-sm ml-3'>
                <label
                  for='remember'
                  class='font-medium  text-gray-400  text-base '
                >
                  Remember me
                </label>
              </div>
            </div>
            <Link
              to='/forget-password'
              class=' hover:underline text-gray-400 ml-auto  font-medium text-base '
            >
              Forget Password?
            </Link>
          </div>
          <div className='text-center'>
            <button
              onClick={(evt) => handlelogin(evt)}
              className={`inline-block w-56 text-center font-semibold py-5 leading-none border
      rounded-full text-white text-lg border-[#053D9A] hover:border-transparent
      hover:text-white bg-[#053D9A] mb-8`}
              // type='submit'
            >
              Sign In
            </button>
            <div class='text-base font-medium text-gray-400'>
              Don't have an account?{' '}
              <Link
                to='/createaccount'
                class='text-[#012054] font-bold hover:underline ml-4'
              >
                Create
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninInputSection;
