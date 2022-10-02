import React, { useState } from 'react';
import userImg from '../../assets/images/testimonial.jpg';
import Button from '../ReusableComponents/Button';
// import InputBox from '../ReusableComponents/InputBox';
import InputLabel from '../ReusableComponents/InputLabel';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  // const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user ? user?.firstName : '');
  const [lastName, setLastName] = useState(user ? user?.lastName : '');
  const [email, setEmail] = useState(user ? user?.email : '');
  const [address, setAddress] = useState(user ? user?.address : '');

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const { data } = await axios.patch(
      `http://localhost:5000/auth/update/${user._id}`,
      {
        firstName,
        lastName,
        email,
        address,
      }
    );
    localStorage.setItem('user', JSON.stringify(data.userUpdated));
    alert('Profile Updated');
    // navigate('/dashboard');
  };

  return (
    <section className=''>
      <div className='container px-6 mx-auto border lg:px-24 xl:px-32'>
        <div className='text-center md:text-left'>
          <h1 className='text-[#012054] font-bold text-xl '>My Profile</h1>
          <div className='relative'>
            <img
              src={userImg}
              className='w-[130px] h-[130px] rounded-[50%] border-4 border-[#5BECC0] my-12 mx-auto md:mx-0'
              alt=''
              srcset=''
            />
          </div>
        </div>
        <form class='w-full max-w-lg'>
          <div class='flex flex-wrap -mx-3 mb-6'>
            <div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <InputLabel label='first name' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div class='w-full md:w-1/2 px-3'>
              <InputLabel label='last name' id='grid-last-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div class='-mx-3 mb-6'>
            <div class='w-full px-3 mb-6 md:mb-0'>
              <InputLabel label='Email' id='grid-email' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div class='-mx-3 mb-6'>
            <div class='w-full px-3 mb-6 md:mb-0'>
              <InputLabel label='Address' id='grid-address' />

              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          {/* <div class="-mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
              <InputLabel label="Password" id="grid-password" />
              <InputBox placeholder="Password" type="password" />
            </div>
          </div> */}
          <div class='-mx-3 pb-6 mt-12 flex justify-between'>
            <button
              className='bg-[#5BECC0] w-28 text-white text-lg inline-block text-center font-semibold py-3 leading-none border
        rounded-full '
              type='button'
              onClick={handleSubmit}
            >
              Save
            </button>
            <Button
              // to='#id'
              className='bg-transparent w-28 text-[#012054] border border-[#012054] hover:bg-[#012054] hover:text-white transition'
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Settings;
