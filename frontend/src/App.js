import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'tw-elements';
import { Settings, Create } from './components/AdminDashboard';
import {
  Home,
  AboutUs,
  CreateAccount,
  SignIn,
  ResetPwd,
  ForgetPwd,
  ErrorPage,
  OurFeatures,
  Pricing,
  AdminDashboard,
} from './pages/index';
import UserDashboard from './pages/UserDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './utils/ProtectedRoutes';
import ProtectedRoutesAdmin from './utils/ProtectedRoutesAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about-us' element={<AboutUs />} />
        <Route path='our-features' element={<OurFeatures />} />
        <Route path='pricing' element={<Pricing />} />
        {/* <Route path="/sign-in" element={<SignIn />} /> */}
        <Route path='/login' element={<SignIn />} />
        <Route path='createaccount' element={<CreateAccount />} />
        <Route path='forget-password' element={<ForgetPwd />} />
        <Route path='/reset-password/:token' element={<ResetPwd />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoutesAdmin>
              <AdminDashboard />
            </ProtectedRoutesAdmin>
          }
        />
        <Route path='settings' element={<Settings />} />
        <Route path='create' element={<Create />} />
        <Route
          path='user-dashboard'
          element={
            <ProtectedRoutes>
              <UserDashboard />
            </ProtectedRoutes>
          }
        />

        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <ToastContainer position='top-center' autoClose={1000} />
    </BrowserRouter>
  );
}

export default App;
