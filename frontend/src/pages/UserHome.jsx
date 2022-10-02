import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import BarChart from '../utils/BarChart';
import { toast } from 'react-toastify';

export const UserHome = () => {
  const [userInfo, setUserInfo] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  if (user.token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${user.token}`;
  }

  const getUserInfo = async () => {
    const { data } = await axios('http://localhost:5000/auth/check');
    setUserInfo(data.user);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const userData = {
    labels: [`Videos Left ${userInfo?.videosLeft}`],
    datasets: [
      {
        label: `Videos Left ${userInfo?.videosLeft}`,
        data: [userInfo?.videosLeft],
        backgroundColor: ['#842eaf'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  };

  const userData2 = {
    labels: [`Storage Left ${userInfo?.storageLeft}`],
    datasets: [
      {
        label: `Storage Left ${userInfo?.storageLeft}`,
        data: [parseInt(`${userInfo?.storageLeft}`)],
        backgroundColor: ['#df0d0d'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    if (userInfo?.videosLeft <= 0) {
      toast.warn('Your videos limit is completed');
    }
  }, [userInfo?.videosLeft]);

  useEffect(() => {
    if (userInfo?.storageLeft <= 0) {
      toast.warn('Your Storage limit is completed');
    }
  }, [userInfo?.storageLeft]);

  return (
    <>
      <div className='w-[500px] flex flex-row ml-10 '>
        <BarChart chartData={userData} />
        <BarChart chartData={userData2} />
      </div>
      {userInfo?.videosLeft <= 0 || userInfo?.storageLeft <= 0 ? (
        <h1 className='text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50  w-[100%] self-start mt-40 mr-[200px]  '>
          Please Upgrade Your plan by going to the Upgrage plan tab
        </h1>
      ) : (
        ''
      )}
    </>
  );
};
