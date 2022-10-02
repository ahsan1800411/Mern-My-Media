import React, { useState } from 'react';
import AboutHeader from '../components/AboutUs/AboutHeader';
import Footer from '../components/ReusableComponents/Footer/Footer';
import WrapperMax from '../components/ReusableComponents/WrapperMax/WrapperMax';
import PackageBox from './../components/Pricing/PackageBox';
import axios from 'axios';
import { useEffect } from 'react';

const Pricing = () => {
  const [plans, setPlans] = useState([]);

  const fetchAllPlansData = async () => {
    const { data } = await axios('http://localhost:5000/plans/');
    setPlans(data.plans);
  };
  useEffect(() => {
    fetchAllPlansData();
  }, []);

  return (
    <>
      <section className='bg-[#EDF2FF] pb-32'>
        <AboutHeader />
        <WrapperMax>
          <div className='flex flex-col items-center justify-center space-x-6 xl:flex-row my-14'>
            <h1 className='mb-8 text-xl font-semibold sm:text-2xl lg:text-3xl xl:text-4xl'>
              Lorem ipsum has survived not only five
            </h1>
            <ul
              className='flex flex-col flex-wrap pl-0 mb-4 space-y-6 list-none border-b-0 nav nav-tabs md:flex-row md:space-x-6 md:space-y-0'
              id='tabs-tab'
              role='tablist'
            >
              <li class='nav-item' role='presentation'>
                <a
                  href='#tabs-monthly'
                  className='
                  inline-block w-44 text-center font-semibold py-4 leading-none border
                  rounded-full text-[#053D9A] hover:text-white text-lg border-[#053D9A] hover:border-transparent hover:bg-[#053D9A]
    '
                  id='tabs-monthly-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#tabs-monthly'
                  role='tab'
                  aria-controls='tabs-monthly'
                  aria-selected='true'
                >
                  Monthly
                </a>
              </li>
              <li class='nav-item' role='presentation'>
                <a
                  href='#tabs-yearly'
                  className='
                  inline-block w-44 text-center font-semibold py-4 leading-none border
                  rounded-full text-[#053D9A] hover:text-white text-lg border-[#053D9A] hover:border-transparent hover:bg-[#053D9A]
    '
                  id='tabs-yearly-tab'
                  data-bs-toggle='pill'
                  data-bs-target='#tabs-yearly'
                  role='tab'
                  aria-controls='tabs-yearly'
                  aria-selected='true'
                >
                  Yearly
                </a>
              </li>
            </ul>
          </div>
          <div className='tab-content' id='tabs-tabContent'>
            <div
              className='tab-pane fade show active'
              id='tabs-monthly'
              role='tabpanel'
              aria-labelledby='tabs-monthly-tab'
            >
              <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3'>
                {plans?.map((plan) => {
                  return (
                    <div key={plan._id}>
                      <PackageBox
                        price={plan.monthlyPrice}
                        packageName={plan.name}
                        packageColor='#012054'
                        className='text-[#012054]'
                        duration='month'
                        desc1={plan.desc1}
                        desc2={plan.desc2}
                        desc3={plan.desc3}
                        desc4={plan.desc4}
                        desc5={plan.desc5}
                        desc6={plan.desc6}
                        desc7={plan.desc7}
                        desc8={plan.desc8}
                        desc9={plan.desc9}
                        desc10={plan.desc10}
                        id={plan._id}
                        videosAllowed={plan.videosAllowed}
                        storageAllowed={plan.storageAllowed}
                        validity={plan.validity}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className='tab-pane fade'
              id='tabs-yearly'
              role='tabpanel'
              aria-labelledby='tabs-yearly-tab'
            >
              <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3'>
                {plans?.map((plan) => {
                  return (
                    <div key={plan._id}>
                      <PackageBox
                        price={plan.annualPrice}
                        packageName={plan.name}
                        packageColor='#012054'
                        className='text-[#012054]'
                        duration='year'
                        desc1={plan.desc1}
                        desc2={plan.desc2}
                        desc3={plan.desc3}
                        desc4={plan.desc4}
                        desc5={plan.desc5}
                        desc6={plan.desc6}
                        desc7={plan.desc7}
                        desc8={plan.desc8}
                        desc9={plan.desc9}
                        desc10={plan.desc10}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </WrapperMax>
      </section>
      <Footer />
    </>
  );
};

export default Pricing;
