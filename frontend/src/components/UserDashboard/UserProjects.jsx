import { useState, useEffect, useRef } from 'react';
import HeadingThree from './../ReusableComponents/HeadingThree';
import axios from 'axios';
import moment from 'moment';
import FileDownload from 'js-file-download';

const UserProjects = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const inputRef = useRef();

  const user = JSON.parse(localStorage.getItem('user'));
  if (user.token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${user.token}`;
  }
  const listVideos = async () => {
    const { data } = await axios('http://localhost:5000/media/user-all');
    setVideos(data.media);
  };

  const fetchLatest = async () => {
    const { data } = await axios.post('http://localhost:5000/media/filter', {
      startDate,
      endDate,
    });

    setVideos(data.filteredVideos);
  };

  useEffect(() => {
    listVideos();
    inputRef.current.focus();
  }, []);

  const downloadVideo = (e, name) => {
    e.preventDefault();
    axios({
      url: 'http://localhost:5000/media/download',
      method: 'POST',
      responseType: 'blob',
      data: {
        name,
      },
    }).then((res) => {
      FileDownload(res.data, name);
    });
  };

  useEffect(() => {
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
      <HeadingThree className='my-8'>My Projects</HeadingThree>
      <div className='flex items-center justify-center h-fit'>
        <div className='container'>
          <table className='flex flex-row flex-no-wrap w-full my-5 overflow-hidden'>
            <thead className='text-gray-500'>
              <tr className='flex flex-col mb-2 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                <th className='p-3 text-left'>Name</th>
                <th className='p-3 text-left'>Size</th>
                <th className='p-3 text-left' width='140px'>
                  Last Modified
                </th>
                <th className='p-3 text-left' width='110px'>
                  Download
                </th>
                <th className='p-3 text-left' width='110px'>
                  Choose
                </th>
              </tr>
              <tr className='flex flex-col mb-2 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                <th className='p-3 text-left'>Name</th>
                <th className='p-3 text-left'>Size</th>
                <th className='p-3 text-left' width='140px'>
                  Last Modified
                </th>
                <th className='p-3 text-left' width='110px'>
                  Download
                </th>
                <th className='p-3 text-left' width='110px'>
                  Choose
                </th>
              </tr>
              <tr className='flex flex-col mb-2 rounded-l-lg flex-no wrap sm:table-row sm:rounded-none sm:mb-0'>
                <th className='p-3 text-left'>Name</th>
                <th className='p-3 text-left'>Size</th>
                <th className='p-3 text-left' width='140px'>
                  Last Modified
                </th>
                <th className='p-3 text-left' width='110px'>
                  Download
                </th>
                <th className='p-3 text-left' width='110px'>
                  Choose
                </th>
              </tr>
            </thead>
            <tbody className='flex-1 sm:flex-none'>
              {videos
                ?.filter((val) => {
                  if (searchTerm === '') {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((video) => {
                  return (
                    <tr
                      className='flex flex-col mb-2 flex-no wrap sm:table-row sm:mb-0'
                      key={video._id}
                    >
                      <td className='p-3 hover:bg-gray-100'>{video.name}</td>
                      <td className='p-3 truncate hover:bg-gray-100'>
                        {video.size} MB
                      </td>
                      <td className='p-3 hover:bg-gray-100'>
                        {' '}
                        {moment(video.createdAt).format('MMM Do YY')}
                      </td>
                      <td className='p-3 hover:bg-gray-100'>
                        <button
                          onClick={(e) => downloadVideo(e, video.name)}
                          type='submit'
                          className={`inline-block text-center font-semibold leading-none rounded-full transition hover:bg-[#012054] w-32 text-[#012054] hover:text-white border border-[#012054] py-1.5 text-sm`}
                        >
                          Download
                        </button>
                      </td>

                      <td className='p-3 text-red-400 cursor-pointer hover:bg-gray-100 hover:text-red-600 hover:font-medium'>
                        <a
                          href='#id'
                          className={`inline-block text-center font-semibold leading-none rounded-full transition hover:bg-[#012054] w-32 text-[#012054] hover:text-white border border-[#012054] py-1.5 text-sm`}
                        >
                          Choose
                        </a>
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

export default UserProjects;
