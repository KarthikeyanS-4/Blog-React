import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AddBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [blogData, setBlogData] = useState([]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem("data_storage")) || [];
        if (temp) {
            setBlogData(temp);
            if (id && temp[id]) {
                setTitle(temp[id].title);
                setUrl(temp[id].url);
                setContent(temp[id].content);
                setAuthor(temp[id].author);
            }
        }
    }, [id]);

    useEffect(() => {
        if (blogData.length > 0) {
            localStorage.setItem("data_storage", JSON.stringify(blogData));
        }
    }, [blogData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = { title, url, content, author, likes: 0, comments: [] };
        let updated;
        if (id) {
            updated = blogData.map((blog, index) => (index === parseInt(id) ? newData : blog));
        } else {
            updated = [...blogData, newData];
        }
        setBlogData(updated);
        navigate('/');
    };

    return (
        <div className='text-xl'>
            <form onSubmit={handleSubmit} className='flex mt-5 ml-5 flex-col gap-10'>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputtitle" className=''>Blog Title :</label>
                    </div>
                    <input type="text" className='w-200 h-10 border-2 indent-4' value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputimage" className=''>Upload Blog Image</label>
                    </div>
                    <input 
                        type="file" 
                        accept="image/*"
                        className='w-200 h-10 border-2 p-1' 
                        onChange={handleImageUpload}
                    />
                    {url && <img src={url} alt="Preview" className="h-40 object-left object-contain" />}
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputauthor" className=''>Author Name :</label>
                    </div>
                    <input type="text" className='w-200 h-10 border-2 indent-4' value={author} placeholder='Author' onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputcontent" className=''>Blog Content :</label>
                    </div>
                    <textarea name="" id="" className='border-2 indent-4 pt-2 w-full h-100' placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <button type='submit' className='h-10 w-40 bg-stone-950 text-white rounded-md'>{id ? 'Update' : 'Publish'}</button>
            </form>
        </div>
    )
}

export default AddBlog;