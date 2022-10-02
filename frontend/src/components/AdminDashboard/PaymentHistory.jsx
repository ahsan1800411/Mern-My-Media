import React from 'react';
import axios from 'axios';
import HeadingThree from '../ReusableComponents/HeadingThree';
import WrapperMin from '../ReusableComponents/WrapperMin/WrapperMin';

const PaymentHistory = () => {
  const [payments, setPayments] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const inputRef = React.useRef();

  const getAllPayments = async () => {
    const { data } = await axios('http://localhost:5000/transactions');
    setPayments(data?.transactions);
  };

  const fetchLatest = async () => {
    const { data } = await axios.post(
      'http://localhost:5000/transactions/all',
      {
        startDate,
        endDate,
      }
    );

    setPayments(data.filteredTransactions);
  };

  React.useEffect(() => {
    getAllPayments();
    inputRef.current.focus();
  }, []);

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
      <HeadingThree className='my-8'>Payments</HeadingThree>
      <div className='flex items-center justify-center h-fit'>
        <div className='container'>
          <table className='flex flex-row flex-no-wrap w-full my-5 overflow-hidden'>
            <thead className='text-gray-500'>
              <tr className='flex flex-col mb-2 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                <th className='p-3 text-left'>Plan Id</th>
                <th className='p-3 text-left'>Current Plan</th>
                <th className='p-3 text-left' width='140px'>
                  Email
                </th>
                <th className='p-3 text-left' width='110px'>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className='flex-1 sm:flex-none'>
              {payments
                ?.filter((val) => {
                  if (searchTerm === '') {
                    return val;
                  } else if (
                    val.email.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((transaction) => {
                  const date = new Date(transaction.createdAt).getTime();
                  return (
                    <tr
                      className='flex flex-col mb-2 flex-no wrap sm:table-row sm:mb-0'
                      key={transaction._id}
                    >
                      <td className='p-3 hover:bg-gray-100'>
                        {`Plan-${transaction.planName}-${date}`}
                      </td>
                      <td className='p-3 truncate hover:bg-gray-100'>
                        {transaction.planName}
                      </td>
                      <td className='p-3 hover:bg-gray-100'>
                        {transaction.email}
                      </td>
                      <td className='p-3 hover:bg-gray-100'>
                        {transaction.amount}$
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

export default PaymentHistory;
