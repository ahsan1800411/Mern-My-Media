import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import user1 from '../assets/images/user.jpg';
import { Sidebar } from '../components/AdminDashboard';
import MainLayout from '../components/AdminDashboard/MainLayout';
import {
  CloseNavBar,
  CreateIcon,
  HomeIcon,
  NavHamburger,
  ProjectsIcon,
  SettingsIcon,
  LogoutIcon,
} from '../assets/svg';

const sidebarData = [
  { id: 0, name: 'Home', icon: <HomeIcon /> },
  { id: 1, name: 'Create', icon: <CreateIcon /> },
  { id: 2, name: 'Projects', icon: <ProjectsIcon /> },
  { id: 3, name: 'Settings', icon: <SettingsIcon /> },
  { id: 4, name: 'Create Plan', icon: <SettingsIcon /> },
  { id: 5, name: 'Users Plan', icon: <ProjectsIcon /> },
  { id: 6, name: 'Payment History', icon: <SettingsIcon /> },
  { id: 7, name: 'App Key', icon: <SettingsIcon /> },
];

export default function AdminDashboard() {
  const test = localStorage.getItem('test');

  const planId = localStorage.getItem('plan-id');

  const user = JSON.parse(localStorage.getItem('user'));

  const [width, setWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(true);
  const [showToggle, setShowToggle] = useState(false);
  const [showLayout, setShowLayout] = useState(
    test && planId ? 'create plan' : 'home'
  );

  const navigate = useNavigate();

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (width > 1024) {
      setShowToggle(true);
    }

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [toggle, width]);

  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('test');
    localStorage.removeItem('plan-id');
    localStorage.removeItem('plan');
    navigate('/');
  };

  return (
    <section className='flex'>
      <Sidebar>
        <div className='absolute left-[100px] mt-8 sm:left-[110px] sm:mt-14'>
          <button
            className='lg:hidden'
            onClick={() => setToggle(!toggle)}
            type='button'
          >
            {toggle && <CloseNavBar />}
          </button>
          <button
            className={`${
              !toggle &&
              'absolute right-14 -mt-5 transition-all duration-700 sm:right-12 sm:-mt-8 lg:hidden'
            }`}
            onClick={() => setToggle(!toggle)}
            type='button'
          >
            {!toggle && <NavHamburger />}
          </button>
        </div>
        <aside
          className={`${toggle ? 'w-24' : 'w-0'}
          bg-[#032054] text-white transition-all duration-200 lg:w-[450px] h-screen`}
        >
          {toggle || showToggle ? (
            <div className='flex flex-col justify-between h-screen'>
              <div className='flex flex-col justify-center mt-2 sm:mt-6'>
                <div className='flex justify-center -ml-3'>
                  <img
                    onClick={() => navigate('/')}
                    className='w-9/12 cursor-pointer'
                    alt='logo'
                  />
                </div>
                <div className='flex items-center justify-center my-4 md:my-8 lg:mt-8 lg:mb-10'>
                  <img
                    className='max-w-[60px] rounded-full border lg:max-w-[65px]'
                    src={user1}
                    alt='user'
                  />
                  <div className='hidden pl-5 break-all lg:block'>
                    <h3 className='font-semibold'>{user?.lastName}</h3>
                    <small className='text-sm font-semibold text-[#8090aa]'>
                      {user?.email}
                    </small>
                  </div>
                </div>
                {sidebarData.map(({ id, name, icon }) => (
                  <div
                    key={id}
                    onClick={() => {
                      setShowLayout(name.toLowerCase());
                      localStorage.removeItem('plan-id');
                      localStorage.removeItem('single-plan');
                    }}
                    className={` ${
                      showLayout === name.toLowerCase() && 'divider'
                    }
                    border-bottom flex flex-wrap items-center justify-center pt-2 pb-4 text-[#8090aa] lg:justify-start lg:pl-14`}
                  >
                    {icon}
                    <h3 className='hidden font-bold lg:ml-8 lg:block'>
                      {name}
                    </h3>
                  </div>
                ))}
              </div>
              <button
                onClick={logoutUser}
                className='flex items-center justify-center pb-8 md:pb-4 lg:ml-16 lg:justify-start'
              >
                <span>
                  <LogoutIcon />
                </span>
                <h3 className='hidden pl-1 font-semibold text-[#3DBEC3] sm:pl-2 md:block lg:text-[20px]'>
                  Logout
                </h3>
              </button>
            </div>
          ) : (
            ''
          )}
        </aside>
      </Sidebar>
      <MainLayout showLayout={showLayout} />
    </section>
  );
}
