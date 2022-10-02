import React from 'react';
import { useState } from 'react';
import OfferText from './OfferText';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PackageBox = ({
  price,
  packageName,
  packageColor,
  btnColor = '',
  className = '',
  duration,
  desc1,
  desc2,
  desc3,
  desc4,
  desc5,
  desc6,
  desc7,
  desc8,
  desc9,
  desc10,
  id,
  storageAllowed,
  videosAllowed,
  validity,
}) => {
  const [sdkReady, setSdkReady] = useState(false);
  const navigate = useNavigate();

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

  const user = JSON.parse(localStorage.getItem('user'));

  const paymentDone = async (details, data) => {
    const amount = price;
    const planId = id;
    const planName = packageName;
    const email = user.email;
    const videosLeft = videosAllowed;
    const storageLeft = storageAllowed;
    const transactionsData = { amount, email, planId, planName };
    if (details.status === 'COMPLETED') {
      setSdkReady(false);
      alert('Done');
      await axios.post('http://localhost:5000/transactions', transactionsData);
      await axios.patch(`http://localhost:5000/auth/update/${user._id}`, {
        planId,
        videosLeft,
        storageLeft,
        validity,
      });
      navigate('/user-dashboard');
    }
  };

  return (
    <>
      <div className='flex-1 relative z-[1000] mb-12'>
        <>
          <div className='bg-white py-14 shadow-2xl rounded-3xl w-[300px] md:w-[370px] mx-auto'>
            <div className='text-center '>
              <h1 className='text-[#012054] text-xl'>
                ${' '}
                <span className='text-6xl text-[#012054] font-medium'>
                  {price}
                </span>{' '}
                / {duration}
              </h1>
              <hr className='w-1/2 mx-auto' />
            </div>
            <div className='flex flex-col items-center space-y-3 mt-7 '>
              {desc1 && <OfferText text={desc1} />}
              {desc2 && <OfferText text={desc2} />}
              {desc3 && <OfferText text={desc3} />}
              {desc4 && <OfferText text={desc4} />}
              {desc5 && <OfferText text={desc5} />}
              {desc6 && <OfferText text={desc6} />}
              {desc7 && <OfferText text={desc7} />}
              {desc8 && <OfferText text={desc8} />}
              {desc9 && <OfferText text={desc9} />}
              {desc10 && <OfferText text={desc10} />}
            </div>
            <div className='mt-20 text-center lg:mt-28'>
              <button
                onClick={payToPaypal}
                className={`inline-block w-40 text-center py-4 leading-none border
              rounded-full border-[#053D9A] bg-[${btnColor}] ${className}`}
              >
                Buy now
              </button>
            </div>
          </div>

          <h1
            className={`-z-10 absolute -left-[20%] sm:left-[7%] md:left-[10%] lg:-left-[10%] xl:left-[3%] 2xl:-left-[10%] top-1/4  transform -rotate-90 uppercase text-base md:text-xl text-white bg-[${packageColor}] w-44 py-3 rounded-xl font-medium text-center`}
          >
            {packageName}
          </h1>
        </>

        <div className='mx-auto mt-3 w-80'>
          {sdkReady && <PayPalButton amount={price} onSuccess={paymentDone} />}
        </div>
      </div>
    </>
  );
};

export default PackageBox;
