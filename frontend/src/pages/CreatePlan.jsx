import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import InputLabel from '../components/ReusableComponents/InputLabel';

const CreatePlan = () => {
  const inputRef = React.useRef();

  const singlePlan = JSON.parse(localStorage.getItem('single-plan'));

  const [languages, setLanguages] = useState(
    singlePlan ? singlePlan.languages : 'Hindi'
  );
  const [name, setName] = useState(singlePlan ? singlePlan.name : '');
  const [videosAllowed, setVideosAllowed] = useState(
    singlePlan ? singlePlan.videosAllowed : ''
  );
  const [monthlyPrice, setMonthlyPrice] = useState(
    singlePlan ? singlePlan.monthlyPrice : ''
  );
  const [annualPrice, setAnnualPrice] = useState(
    singlePlan ? singlePlan.annualPrice : ''
  );
  const [storageAllowed, setStorageAllowed] = useState(
    singlePlan ? singlePlan.storageAllowed : ''
  );
  const [desc1, setDesc1] = useState(singlePlan ? singlePlan.desc1 : '');
  const [desc2, setDesc2] = useState(singlePlan ? singlePlan.desc2 : '');
  const [desc3, setDesc3] = useState(singlePlan ? singlePlan.desc3 : '');
  const [desc4, setDesc4] = useState(singlePlan ? singlePlan.desc4 : '');
  const [desc5, setDesc5] = useState(singlePlan ? singlePlan.desc5 : '');
  const [desc6, setDesc6] = useState(singlePlan ? singlePlan.desc6 : '');
  const [desc7, setDesc7] = useState(singlePlan ? singlePlan.desc7 : '');
  const [desc8, setDesc8] = useState(singlePlan ? singlePlan.desc8 : '');
  const [desc9, setDesc9] = useState(singlePlan ? singlePlan.desc9 : '');
  const [desc10, setDesc10] = useState(singlePlan ? singlePlan.desc10 : '');
  const [status, setStatus] = useState(
    singlePlan ? singlePlan.status : 'Guest'
  );

  const allLanguages = [
    {
      name: 'Hindi',
    },
    { name: 'English' },
  ];

  const allStatuses = [
    { name: 'Guest' },
    { name: 'Free' },
    { name: 'Active' },
    { name: 'Inactive' },
  ];

  const planId = localStorage.getItem('plan-id');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const planData = {
        languages,
        name,
        videosAllowed,
        monthlyPrice,
        annualPrice,
        storageAllowed,
        desc1,
        desc10,
        desc2,
        desc3,
        desc4,
        desc5,
        desc6,
        desc7,
        desc8,
        desc9,
        status,
      };

      if (planId) {
        await axios.patch(
          `http://localhost:5000/plans/update/${planId}`,
          planData
        );

        localStorage.removeItem('plan-id');
        alert('Plan Updated');
      } else {
        await axios.post('http://localhost:5000/plans/create', planData);

        alert('Plan Created');
      }

      setName('');
      setVideosAllowed('');
      setMonthlyPrice('');
      setStorageAllowed('');
      setAnnualPrice('');
      setDesc1('');
      setDesc2('');
      setDesc3('');
      setDesc4('');
      setDesc5('');
      setDesc6('');
      setDesc7('');
      setDesc8('');
      setDesc9('');
      setDesc10('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <section className=''>
      <div className='container px-6 mx-auto mt-3 border lg:px-24 xl:px-32'>
        <form class='w-full ' onSubmit={handleSubmit}>
          <div class='flex flex-wrap -mx-3 mb-6 mt-2'>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 '>
              <InputLabel label='Plan Name' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={inputRef}
                required
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
              <InputLabel label='Languages' id='grid-first-name' />
              <select
                id='country_field'
                className=' block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                required
              >
                {allLanguages.map((language) => (
                  <option key={language.name} value={language.name}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>

            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
              <InputLabel label='Status' id='grid-first-name' />
              <select
                id='country_field'
                className=' block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                {allStatuses.map((status) => (
                  <option key={status.name} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Videos Allowed' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={videosAllowed}
                onChange={(e) => setVideosAllowed(e.target.value)}
                required
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Monthly Price' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={monthlyPrice}
                onChange={(e) => setMonthlyPrice(e.target.value)}
                required
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Annual Price' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={annualPrice}
                onChange={(e) => setAnnualPrice(e.target.value)}
                required
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Storage Allowed' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={storageAllowed}
                onChange={(e) => setStorageAllowed(e.target.value)}
                required
              />
            </div>

            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Description 1' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={desc1}
                onChange={(e) => setDesc1(e.target.value)}
                maxLength='40'
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Description 2' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={desc2}
                onChange={(e) => setDesc2(e.target.value)}
                maxLength='40'
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Description 3' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={desc3}
                onChange={(e) => setDesc3(e.target.value)}
                maxLength='40'
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Description 4' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={desc4}
                onChange={(e) => setDesc4(e.target.value)}
                maxLength='40'
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Description 5' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={desc5}
                onChange={(e) => setDesc5(e.target.value)}
                maxLength='40'
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Description 6' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={desc6}
                onChange={(e) => setDesc6(e.target.value)}
                maxLength='40'
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Description 7' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={desc7}
                onChange={(e) => setDesc7(e.target.value)}
                maxLength='40'
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Description 8' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={desc8}
                onChange={(e) => setDesc8(e.target.value)}
                maxLength='40'
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Description 9' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={desc9}
                onChange={(e) => setDesc9(e.target.value)}
                maxLength='40'
              />
            </div>
            <div class='w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-6'>
              <InputLabel label='Description 10' id='grid-first-name' />
              <input
                className='appearance-none block w-full text-[#012054] border py-2 md:py-3 px-4 leading-tight focus:outline-none border-[#012054] '
                type='text'
                value={desc10}
                onChange={(e) => setDesc10(e.target.value)}
                maxLength='40'
              />
            </div>
          </div>
          {/*  */}

          <div class='-mx-3  ml-3 pb-6 mt-6 flex justify-between'>
            <button
              className='bg-[#5BECC0] w-28 text-white text-lg inline-block text-center font-semibold py-3 leading-none border
        rounded-full '
              type='submit'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePlan;
