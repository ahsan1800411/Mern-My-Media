import React, { useState } from 'react';
import successfullImg from '../../assets/images/successful.svg';
import WrapperMin from '../ReusableComponents/WrapperMin/WrapperMin';
import axios from 'axios';
import { useEffect } from 'react';

const Create = () => {
  const [name] = useState('');
  const [videos, setVideos] = useState([]);
  const [uploaded, setUploaded] = useState(null);
  const [length, setLength] = useState(null);
  const [user, setUser] = useState(null);

  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  const userInfo = JSON.parse(localStorage.getItem('user'));

  if (userInfo.token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${userInfo.token}`;
  }

  // ref
  const inputRef = React.useRef(null);

  // handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setVideos(e.dataTransfer.files);
      setLength(e.dataTransfer.files.length);
    }
  };

  // convert to Bytes
  function toBytes(size, type) {
    const types = ['B', 'KB', 'MB', 'GB', 'TB'];

    const key = types.indexOf(type.toUpperCase());

    if (typeof key !== 'boolean') {
      return size * 1024 ** key;
    }
    return 'invalid type: type must be GB/KB/MB etc.';
  }

  // let today = new Date();

  // triggers when file is selected with click
  const handleChange = (e) => {
    if (e.target.files.length > user?.videosLeft) {
      return alert(`Sorry, you have just ${user.videosLeft} video left`);
    }
    if (user.videosLeft <= 0) {
      return alert('Your video limit is completed. Please Upgrade');
    }
    if (user.storageLeft <= 0) {
      return alert('Your storage is empty. Please Upgrade');
    }
    // if (today > new Date(user.planValidity)) {
    //   return alert('Your Period ends');
    // }

    let result;
    if (userInfo?.storageLeft.toLowerCase().includes('mb')) {
      result = toBytes(userInfo?.storageLeft.replace(/[a-z ]/gi, ''), 'MB');
    } else {
      result = toBytes(userInfo?.storageLeft.replace(/[a-z ]/gi, ''), 'GB');
    }

    if (e.target.files[0].size > result) {
      return alert(
        `Sorry, You're only allowed to upload video of size ${userInfo?.storageLeft} `
      );
    } else {
      setVideos(e.target.files);
      var files = e.target.files;
      setLength(files.length);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    for (let key in videos) {
      formdata.append('videos', videos[key]);
    }

    formdata.append('name', name);

    axios
      .post(`http://localhost:5000/media/create`, formdata, {
        onUploadProgress: (data) => {
          setUploaded(Math.round((data.loaded / data.total) * 100));
        },
      })
      .then((success) => {
        setLength(null);
        setVideos([]);
      })
      .catch((error) => {
        // console.log();
        alert(error.response.data.msg);
        setVideos([]);
        setLength(null);
      });
  };

  const fetchUserData = async () => {
    const { data } = await axios('http://localhost:5000/auth/check');
    setUser(data?.user);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <section className='bg-[#EDF2FF]'>
      <WrapperMin>
        <div className='flex flex-col xl:flex-row mt-8 bg-[#012054] xl:w-[950px] rounded-lg p-10'>
          <form
            onSubmit={handleSubmit}
            id='form-file-upload'
            onDragEnter={handleDrag}
            className='flex-1 mb-8 xl:mb-0'
          >
            <div className='mb-6'>
              <label className='mb-2 text-2xl font-semibold text-white'>
                Upload your files
              </label>
              <p className='text-sm text-gray-300'>
                It is a long established fact that a reader will be
              </p>
            </div>
            <div className='flex items-center w-full'>
              <label className='flex flex-col border-2 border-gray-300 items-center justify-center border-dashed w-[250px] md:w-[420px] xl:w-[320px] md:h-[300px] rounded-xl p-3 md:p-0'>
                <div className='flex flex-col items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-8 h-8 text-gray-400 cursor-pointer group-hover:text-gray-600'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                    />
                  </svg>
                  <p className='text-sm tracking-wider text-center text-gray-400 cursor-pointer group-hover:text-gray-600'>
                    Drag&Drop your files here <br /> or{' '}
                    <span className='text-[#5BECC0]'>browse</span> to upload
                  </p>
                </div>
                <input
                  type='file'
                  title=' '
                  name='videos'
                  id='videos'
                  multiple
                  accept='.mp4, .mkv'
                  onChange={handleChange}
                  ref={inputRef}
                  className='opacity-0 input-rm'
                />
              </label>
            </div>
            {length && (
              <button
                type='submit'
                className='px-8 py-2 mt-4 mb-2 text-xs font-bold leading-tight text-center text-white uppercase transition duration-150 ease-in-out border-2 border-blue-600 rounded-full sm:ml-12 md:ml-24 hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-0'
              >
                Upload
              </button>
            )}
          </form>
          <div className='flex-1 '>
            <div
              className={`flex flex-col items-center  ${
                uploaded === 100 ? 'space-y-12' : 'space-y-40'
              } `}
            >
              <div className='text-xl font-bold text-white'>
                {length && <div>{length} Files Selected</div>}
              </div>
              {uploaded === 100 || uploaded === null ? (
                <div></div>
              ) : (
                <div className='w-full bg-white rounded-full dark:bg-gray-700'>
                  <div
                    className='bg-blue-600 text-xs  text-center font-medium text-white  p-0.5 leading-none rounded-full'
                    style={{ width: `${uploaded} %` }}
                  >
                    {`${uploaded}`}%
                  </div>
                </div>
              )}
              {uploaded !== 100 ? (
                <div></div>
              ) : (
                <div>
                  <img src={successfullImg} className='w-28' alt='' />
                  <label className='mt-2 text-lg font-semibold text-white'>
                    File uploaded successfully
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </WrapperMin>
    </section>
  );
};

export default Create;
