import { useEffect, useState } from 'react'

function AddBlog() {
    const [title, settitle] = useState('')
    const [url, seturl] = useState('');
    const [content, setcontent] = useState('');
    const [blogdata, setblogdata] = useState([]);


    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem("data_storage")) || [];
        if (temp) {
            setblogdata(temp);
        }
    }, []);

    useEffect(() => {
        if (blogdata.length > 0) {
            localStorage.setItem("data_storage", JSON.stringify(blogdata));
        }
    }, [blogdata]);

    function handleSubmit(e) {
        e.preventDefault();
        const newdata = { title, url, content };
        const updated = [...blogdata, newdata];
        setblogdata(updated);
        seturl('');
        setcontent('');

    }

    return (
        <div className='text-xl'>
            <form onSubmit={handleSubmit} className='flex mt-5 ml-5 flex-col gap-10'>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputtitle" className=''>Blog Title :</label>
                    </div>
                    <input type="text" className='w-200 h-10 border-2 indent-4' value={title} placeholder='Title' onChange={(e) => settitle(e.target.value)} />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputurl" className=''>Enter Image URL </label>
                    </div>
                    <input type="text" className='w-200 h-10 border-2 indent-4' value={url} placeholder='Url' onChange={(e) => seturl(e.target.value)} />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputurl" className=''>Blog Content :</label>
                    </div>
                    <textarea name="" id="" className='border-2 indent-4 pt-2 w-full h-100' placeholder='Content' value={content} onChange={(e) => setcontent(e.target.value)}></textarea>
                </div>
                <button type='submit' className='h-10 w-40 bg-stone-950 text-white rounded-md'>Publish</button>
            </form>
        </div>
    )
}

export default AddBlog