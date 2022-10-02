import React from 'react';
import CreatePlan from '../../pages/CreatePlan.jsx';
import CreateAdmin from './CreateAdmin.jsx';
import { Home, Settings } from './index.js';
import PaymentHistory from './PaymentHistory.jsx';
import Projects from './Projects.jsx';
import UserPlans from './UserPlans.jsx';
import AdminAppKey from './AdminAppKey.jsx';

export default function MainLayout({ showLayout }) {
  let position = 'justify-center';
  let position2 = 'items-center';
  let display = 'flex';
  if (showLayout === 'settings' || 'projects') {
    position = '';
  }
  if (showLayout === 'app key') {
    position2 = '';
    position = '';
    display = '';
  }

  if (showLayout === 'home') {
    showLayout = <Home />;
  } else if (showLayout === 'settings') {
    showLayout = <Settings />;
  } else if (showLayout === 'create') {
    showLayout = <CreateAdmin />;
  } else if (showLayout === 'projects') {
    showLayout = <Projects />;
  } else if (showLayout === 'create plan') {
    showLayout = <CreatePlan />;
  } else if (showLayout === 'users plan') {
    showLayout = <UserPlans />;
  } else if (showLayout === 'payment history') {
    showLayout = <PaymentHistory />;
  } else if (showLayout === 'app key') {
    showLayout = <AdminAppKey />;
  }

  return (
    <div className='w-full bg-[#032054]'>
      <div
        className={`${display} sm:h-screen ${position2}  ${position} bg-[#edf2ff] lg:rounded-l-[50px]`}
      >
        {showLayout}
      </div>
    </div>
  );
}
