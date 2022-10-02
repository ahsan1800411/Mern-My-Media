import React, { useEffect } from 'react';
import HeadingThree from '../ReusableComponents/HeadingThree';
import axios from 'axios';
import { useState } from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { useRef } from 'react';

const UserPlans = () => {
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const inputRef = useRef();

  const fetchAllPlansData = async () => {
    const { data } = await axios('http://localhost:5000/plans/');
    setPlans(data?.plans);
  };

  const deletePlan = async (id) => {
    await axios.delete(`http://localhost:5000/plans/update/${id}`);
  };

  const fetchLatest = async () => {
    const { data } = await axios.post('http://localhost:5000/plans/all', {
      startDate,
      endDate,
    });

    setPlans(data?.filteredPlans);
  };

  useEffect(() => {
    if (!startDate && !endDate) {
      fetchAllPlansData();
    }
    inputRef.current.focus();
  }, [plans, startDate, endDate]);

  const editPlan = async (id) => {
    const { data } = await axios(`http://localhost:5000/plans/single/${id}`);
    localStorage.setItem('single-plan', JSON.stringify(data.plan));
    localStorage.setItem('plan-id', id);
    localStorage.setItem('test', 'test');
    window.location.reload();
  };

  React.useEffect(() => {
    if (startDate && startDate > endDate && endDate) {
      alert('End Date must be greater than start Date');
      setEndDate('');
      return;
    }
  }, [endDate, startDate]);

  return (
    <div className='pt-16 pb-10 ml-12'>
      <div className='flex flex-row '>
        <input
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          ref={inputRef}
          className='w-full px-3 py-2 mr-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
        />

        <label htmlFor='startDate' className='mt-2 ml-2 w-44'>
          Start Date:
        </label>
        <input
          type='date'
          className='w-56 mr-4'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor='startDate' className='mt-2 ml-2 w-44'>
          End Date:
        </label>
        <input
          type='date'
          className='w-56'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {startDate && endDate ? (
          <button
            className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ml-2 '
            onClick={fetchLatest}
          >
            Filter
          </button>
        ) : (
          ''
        )}
      </div>
      <HeadingThree className='my-8'>User's Plan</HeadingThree>
      <div className='flex items-center justify-center h-fit'>
        <div className='container'>
          <table className='flex flex-row flex-no-wrap w-full my-5 overflow-hidden'>
            <thead className='text-gray-500'>
              <tr className='flex flex-col mb-2 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                <th className='p-3 text-left'> Plan Name</th>
                <th className='p-3 text-left'>Videos Allowed</th>
                <th className='p-3 text-left'>Storage Allowed</th>
                <th className='p-3 text-left'>Monthly Price</th>
                <th className='p-3 text-left'>Annual Price</th>
                <th className='p-3 text-left'>Status</th>
                <th className='p-3 text-left'>Languages</th>
              </tr>
            </thead>
            <tbody className='flex-1 sm:flex-none'>
              {plans
                ?.filter((val) => {
                  if (searchTerm === '') {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((plan) => {
                  return (
                    <tr
                      className='flex flex-col mb-2 flex-no wrap sm:table-row sm:mb-0'
                      key={plan._id}
                    >
                      <td className='p-3 hover:bg-gray-100'>{plan.name}</td>
                      <td className='p-3 truncate hover:bg-gray-100'>
                        {plan.videosAllowed}
                      </td>
                      <td className='p-3 hover:bg-gray-100'>
                        {plan.storageAllowed}
                      </td>
                      <td className='p-3 hover:bg-gray-100'>
                        {plan.monthlyPrice} $
                      </td>
                      <td className='p-3 hover:bg-gray-100'>
                        {plan.annualPrice} $
                      </td>
                      <td className='p-3 hover:bg-gray-100'>{plan.status}</td>
                      <td className='p-3 hover:bg-gray-100'>
                        {plan.languages}
                      </td>

                      <td className='p-3 text-red-400 cursor-pointer hover:bg-gray-100 hover:text-red-600 hover:font-medium'>
                        <button
                          type='button'
                          onClick={() => deletePlan(plan._id)}
                        >
                          <AiFillDelete size={20} />
                        </button>
                      </td>
                      <td className='p-3 text-red-400 cursor-pointer hover:bg-gray-100 hover:text-red-600 hover:font-medium'>
                        <button
                          type='button'
                          onClick={() => editPlan(plan._id)}
                        >
                          <AiTwotoneEdit size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPlans;
