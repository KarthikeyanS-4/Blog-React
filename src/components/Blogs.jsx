import { useEffect, useState } from 'react'

const Blogs = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("data_storage"));
    setdata(temp);
  }, [])

  return (
    <>
      {
        data === null ? (
          console.log("OK"),
          <p>No blogs added yet.</p>
        ) :

          (
            <div>
              {data.map((item, index) => (

                <div key={index} className=' p-3 flex container mt-2 border-b-2'>
                  {item.url && <img src={item.url} alt="Blog" className='h-100 w-800' />}
                  <div>
                    <p className='font-bold text-3xl text-center mb-5  text-gray-500 uppercase'>{item.title}</p>
                    <p className='pl-10 pr-8'>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )
      }
    </>
  )

}

export default Blogs