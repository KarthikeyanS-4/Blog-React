import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("data_storage"));
    setData(temp);
  }, []);

  const handleBlogClick = (index) => {
    navigate(`/blog/${index}`);
  };

  const handleDelete = (index) => {
    const temp = JSON.parse(localStorage.getItem("data_storage"));
    temp.splice(index, 1);
    localStorage.setItem("data_storage", JSON.stringify(temp));
    setData(temp);
  };

  return (
    <>
      {
        data === null ? (
          <p className='text-2xl w-full text-center'>No blogs added yet.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {data.map((item, index) => (
              <div key={index} className='p-3 border-2 rounded-lg cursor-pointer'>
                {item.url && <img src={item.url} alt="Blog" className='h-40 w-full object-cover mb-4' onClick={() => handleBlogClick(index)} />}
                <div onClick={() => handleBlogClick(index)}>
                  <p className='font-bold text-2xl mb-2 text-gray-500 uppercase'>{item.title}</p>
                  <p className='text-gray-600'>{item.content.substring(0, 100)}...</p>
                </div>
                <button onClick={() => handleDelete(index)} className='mt-4 bg-red-500 text-white p-2 rounded'>Delete</button>
              </div>
            ))}
          </div>
        )
      }
    </>
  );
};

export default Blogs;