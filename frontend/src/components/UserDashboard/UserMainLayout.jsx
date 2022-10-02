import React from 'react';
import { UserHome } from '../../pages/UserHome.jsx';
import Create from '../AdminDashboard/Create.jsx';
import Settings from './../AdminDashboard/Settings';
import AppKey from './AppKey.jsx';
import UpgragePlan from './UpgragePlan.jsx';
import UserPaymentHistory from './UserPaymentHistory.jsx';
import UserProjects from './UserProjects.jsx';

export default function UserMainLayout({ showLayout }) {
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
    showLayout = <UserHome />;
  } else if (showLayout === 'settings') {
    showLayout = <Settings />;
  } else if (showLayout === 'create') {
    showLayout = <Create />;
  } else if (showLayout === 'projects') {
    showLayout = <UserProjects />;
  } else if (showLayout === 'payment history') {
    showLayout = <UserPaymentHistory />;
  } else if (showLayout === 'upgrage plan') {
    showLayout = <UpgragePlan />;
  } else if (showLayout === 'app key') {
    showLayout = <AppKey />;
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
