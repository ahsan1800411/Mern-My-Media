import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

const Home = () => {
  const [numberOfUsers, setNumberOfUsers] = useState(null);
  const [numberOfVideos, setNumberOfVideos] = useState(null);
  const getAllUsers = async () => {
    const { data } = await axios('http://localhost:5000/auth/count');
    setNumberOfUsers(data.totalUsers);
    setNumberOfVideos(data.totalVideos);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className='flex flex-col items-center justify-center w-64 h-32 bg-white shadow-lg ml-28'>
        <h1>
          Total Videos are:{' '}
          {numberOfVideos && (
            <span className='font-bold '>{numberOfVideos}</span>
          )}
        </h1>
      </div>
      <div className='flex flex-col items-center justify-center w-64 h-32 bg-white shadow-lg ml-28'>
        <h1>
          Total Users are:{' '}
          {numberOfUsers && <span className='font-bold '>{numberOfUsers}</span>}
        </h1>
      </div>
    </>
  );
};

export default Home;
