import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        // Fetch the blog post by ID from local storage and set the state
        const temp = JSON.parse(localStorage.getItem("data_storage"));
        if (temp && temp[id]) {
            setTitle(temp[id].title);
            setContent(temp[id].content);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const temp = JSON.parse(localStorage.getItem("data_storage"));
        temp[id] = { ...temp[id], title, content };
        localStorage.setItem("data_storage", JSON.stringify(temp));
        navigate(`/blog/${id}`);
    };

    return (
        <div className='text-xl'>
            <form onSubmit={handleSubmit} className='flex mt-5 ml-5 flex-col gap-10'>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputtitle" className=''>Blog Title :</label>
                    </div>
                    <input
                        type="text"
                        className='w-200 h-10 border-2 indent-4'
                        value={title}
                        placeholder='Title'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputcontent" className=''>Blog Content :</label>
                    </div>
                    <textarea
                        className='border-2 indent-4 pt-2 w-full h-100'
                        placeholder='Content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button type='submit' className='h-10 w-40 bg-stone-950 text-white rounded-md'>Save</button>
            </form>
        </div>
    );
};

export default EditBlog;
