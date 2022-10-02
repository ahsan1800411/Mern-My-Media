import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeadingTwo from './../../ReusableComponents/HeadingTwo';
import { MdOutlinePriceChange } from 'react-icons/md';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

const CreateInputSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('Choose Plan');
  const [amount, setAmount] = useState(null);

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  const fetchAllPlansData = async () => {
    const { data } = await axios('http://localhost:5000/plans/');
    setPlans(data.plans);
  };
  useEffect(() => {
    fetchAllPlansData();
    if (
      selectedPlan == 0 ||
      selectedPlan === 'Free Plan' ||
      selectedPlan === 'Choose Plan'
    ) {
      return setSdkReady(false);
    }
  }, [selectedPlan]);

  const [sdkReady, setSdkReady] = useState(false);

  const payToPaypal = () => {
    const addPayPalScript = async () => {
      const clientId =
        'Acagibbz1X7hH5MBBpS0-yM1aiofGL3_-EELEV8f2vh7dglgzhEX-8drui4TW4FoDeLti_zpzJOGlkje';
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  };

  const filteredPlans = plans?.filter((plan) => {
    if (
      plan.annualPrice === parseInt(selectedPlan) ||
      plan.monthlyPrice === parseInt(selectedPlan)
    ) {
      let result = Object.assign({}, plan);
      return result;
    }
  });
  const result = Object.assign({}, filteredPlans);

  const paymentDone = async (details, data) => {
    const planId = result[0]['_id'];
    const planName = result[0]['name'];

    const transactionsData = { amount, email, planId, planName };
    if (details.status === 'COMPLETED') {
      setSdkReady(false);
      alert('Done');
      await axios.post('http://localhost:5000/transactions', transactionsData);
      navigate('/login');
    }
  };

  const collectData = async (e) => {
    e.preventDefault();
    const planId = result[0]['_id'];
    const otherId = result[0]['_id'];
    const storageLeft = result[0]['storageAllowed'];
    const videosLeft = result[0]['videosAllowed'];
    const data = {
      planId,
      storageLeft,
      videosLeft,
      name,
      email,
      password,
      otherId,
    };

    await axios.post('http://localhost:5000/createaccount', data);

    if (selectedPlan == 0 || selectedPlan === 'Free Plan') {
      navigate('/login');
    }
  };

  return (
    <div className='flex-1 p-10 order-2 lg:order-none sm:w-[600px] mx-auto'>
      <div className='mb-8 text-center'>
        <HeadingTwo className='mb-4 font-bold'>Hello</HeadingTwo>
      </div>
      <form className='space-y-4 xl:space-y-8' onSubmit={collectData}>
        <div className='flex flex-wrap items-stretch w-full relative bg-white items-center rounded-3xl mb-6 pr-10 shadow shadow-[#5BECC0] '>
          <div className='flex justify-center px-2 py-3 -mr-px w-15'>
            <span className='flex items-center px-3 text-xl leading-normal text-gray-800 bg-white border-0 rounded rounded-r-none'>
              <i className='fas fa-user'></i>
            </span>
          </div>
          <input
            className='relative self-center flex-1 flex-auto flex-grow flex-shrink w-px h-10 px-3 font-medium leading-normal border-0 rounded rounded-l-none outline-none border-grey-light'
            type='text'
            placeholder='enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-wrap items-stretch w-full relative bg-white items-center rounded-3xl mb-6 pr-10 shadow shadow-[#5BECC0] '>
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
            required
          />
        </div>
        <div className='flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded-3xl mb-4 shadow shadow-[#5BECC0] '>
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
            required
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

        {/* payment  */}
        <div className='flex flex-wrap items-stretch w-full relative bg-white items-center rounded-3xl mb-6 pr-10 shadow shadow-[#5BECC0] '>
          <div className='flex justify-center px-2 py-3 -mr-px w-15'>
            <span className='flex items-center px-3 text-xl leading-normal text-gray-800 bg-white border-0 rounded rounded-r-none'>
              <MdOutlinePriceChange size={23} color='black' />
            </span>
          </div>
          <select
            id='plan_field'
            className='relative self-center flex-1 flex-auto flex-grow flex-shrink w-px h-10 px-3 font-normal leading-normal border-0 rounded rounded-l-none outline-none cursor-pointer border-grey-light'
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            required
            onClick={(e) => {
              const amt = parseInt(e.target.value);

              setAmount(amt);
            }}
          >
            <option value='Choose Plan'>Choose Plan</option>
            {plans.map((plan) => (
              <>
                <option value={plan.monthlyPrice}>
                  {plan.name} (Monthly ${plan.monthlyPrice})
                </option>
                <option value={plan.annualPrice}>
                  {plan.name} (Yearly ${plan.annualPrice})
                </option>
              </>
            ))}
          </select>
        </div>

        <div className='text-center'>
          <button
            type='submit'
            href='#id'
            className={`inline-block w-56 text-center font-semibold py-5 leading-none border
      rounded-full text-white border-[#053D9A] hover:border-transparent
      hover:text-white bg-[#053D9A] mb-8`}
            onClick={payToPaypal}
          >
            Create Account
          </button>
          {sdkReady && (
            <h1 className='mb-4 text-lg font-bold text-center '>
              One Step to complete the payment
            </h1>
          )}
          <div className='w-64 mx-auto'>
            {sdkReady && name && email && password && (
              <PayPalButton amount={amount} onSuccess={paymentDone} />
            )}
          </div>
          <div className='text-base font-medium text-gray-400'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-[#012054] font-bold hover:underline ml-4'
            >
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateInputSection;
