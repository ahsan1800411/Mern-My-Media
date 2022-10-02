import React from 'react';
import { useState } from 'react';
import { AiOutlineAppstoreAdd, AiFillDelete } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';

import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const AppKey = () => {
  const [api_keys, setApi_keys] = useState(null);
  const [app_names, setApp_names] = useState(null);
  const [app_name, setApp_name] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  if (user.token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${user.token}`;
  }

  const fetchData = async () => {
    const { data } = await axios('http://localhost:5000/auth/check');

    setApi_keys(data.user.API_KEYS);
    setApp_names(data.user.app_name);
  };

  useEffect(() => {
    fetchData();
  }, [app_names]);

  const result = api_keys?.map((key) => key);

  const deleteApiKey = async (name) => {
    await axios.delete(`http://localhost:5000/auth/api-keys/${user._id}`, {
      data: { name },
    });
  };
  const createApiKey = async () => {
    if (!app_name) {
      return toast.warn('Please provide a value');
    }
    await axios.patch(`http://localhost:5000/auth/api-keys/${user._id}`, {
      app_name,
    });
    toast.success('App Name Created');
  };

  return (
    <>
      <div className='flex justify-center'>
        <h1 className='mt-24 text-2xl font-extrabold text-green-800'>
          List of App Keys
        </h1>
      </div>
      <div className='flex justify-between mt-20 '>
        <div>
          <h1 className='ml-20 text-xl font-extrabold text-green-800'>
            App Keys
          </h1>
        </div>
        <button
          className='flex justify-end mr-20 font-bold text-white bg-green-700 '
          type='button'
          data-bs-toggle='modal'
          data-bs-target='#staticBackdrop'
        >
          <AiOutlineAppstoreAdd size={30} />
          <p className='ml-4 mr-2 '>Add App Key</p>
        </button>
      </div>

      {/* start */}
      <div className='ml-16'>
        <div className='flex flex-row '></div>

        <div className='flex items-center justify-center h-fit'>
          <div className='container'>
            <table className='flex flex-row flex-no-wrap w-full my-5 overflow-hidden'>
              <thead className='mb-2 text-white bg-pink-500'>
                <tr className='flex flex-col mb-2 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                  <th className='p-3 text-left'>Name</th>
                  <th className='p-3 text-left'>Api Key</th>
                  <th className='p-3 text-left'>Copy Api Key</th>
                  <th className='p-3 text-left'>Created By</th>
                  <th className='p-3 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody className='flex-1 sm:flex-none bg-green-700e'>
                {app_names?.map((name, index) => {
                  return (
                    <tr
                      className='flex flex-col mb-2 flex-no wrap sm:table-row sm:mb-0 text-whit'
                      key={index}
                    >
                      <td className='p-3 hover:bg-gray-100'>{name}</td>

                      <td className='p-3 truncate hover:bg-gray-100'>
                        {result[index]}
                      </td>

                      <td className='p-3 hover:bg-gray-100'>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(result[index]);
                            toast.success('Copied');
                          }}
                        >
                          <BiCopy size={25} />
                        </button>
                      </td>
                      <td className='p-3 hover:bg-gray-100'>{user.email}</td>
                      <td className='p-3 text-red-400 cursor-pointer hover:text-red-600 hover:font-medium'>
                        <button
                          type='button'
                          onClick={() => deleteApiKey(name)}
                        >
                          <AiFillDelete size={20} />
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

      {/* Modal*/}

      <div
        className='fixed left-0 hidden w-full h-full overflow-x-hidden overflow-y-auto outline-none modal fade top-20'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabindex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='relative w-auto pointer-events-none modal-dialog'>
          <div className='relative flex flex-col w-full text-current bg-white border-none rounded-md shadow-lg outline-none pointer-events-auto modal-content bg-clip-padding'>
            <div className='flex items-center justify-between flex-shrink-0 p-4 border-b border-gray-200 modal-header rounded-t-md'>
              <h5
                className='text-xl font-medium leading-normal text-gray-800'
                id='exampleModalLabel'
              >
                Add New App
              </h5>
              <button
                type='button'
                className='box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 btn-close focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='relative p-4 modal-body'>
              <label
                className='block mb-2 ml-2 text-sm font-bold text-gray-700'
                htmlFor='username'
              >
                App Name
              </label>
              <input
                className='w-full px-3 py-2 ml-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                id='appname'
                type='text'
                placeholder='Please Enter App Name'
                value={app_name}
                onChange={(e) => setApp_name(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-wrap items-center justify-end flex-shrink-0 p-4 border-t border-gray-200 modal-footer rounded-b-md'>
              <button
                type='button'
                className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1'
                onClick={createApiKey}
                data-bs-dismiss={app_name ? 'modal' : ''}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppKey;
