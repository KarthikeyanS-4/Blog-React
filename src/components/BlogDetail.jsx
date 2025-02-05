import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThumbsUp } from 'lucide-react';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("data_storage"));
    if (temp && temp[id]) {
      setBlog(temp[id]);
      setComments(temp[id].comments || []);
    }
  }, [id]);

  const handleLike = () => {
    const temp = JSON.parse(localStorage.getItem("data_storage"));
    temp[id].likes += 1;
    localStorage.setItem("data_storage", JSON.stringify(temp));
    setBlog({ ...blog, likes: blog.likes + 1 });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const temp = JSON.parse(localStorage.getItem("data_storage"));
    const newComment = { text: comment, date: new Date().toISOString() };
    temp[id].comments = [...(temp[id].comments || []), newComment];
    localStorage.setItem("data_storage", JSON.stringify(temp));
    setComments([...comments, newComment]);
    setComment('');
  };

  const handleEdit = () => {
    navigate(`/editblog/${id}`);
  };

  if (!blog) {
    return <div className="p-5 text-2xl w-full text-center">Blog not found.</div>;
  }

  return (
    <div className='p-3 container mt-2'>
      <div className='max-w-4xl mx-auto'>
        {blog.url && <img src={blog.url} alt="Blog" className='w-full max-h-96 object-contain mb-6' />}
        <h1 className='font-bold text-3xl text-center mb-5 text-gray-500 uppercase'>{blog.title}</h1>
        <p className='text-gray-600 mb-4'>By {blog.author}</p>
        <div className='prose max-w-none'>
          <p className='whitespace-pre-wrap'>{blog.content}</p>
        </div>
        <div className='mt-6 flex gap-4 text-gray-500'>
          <span onClick={handleLike} className='flex items-center cursor-pointer text-center gap-2'><ThumbsUp size={20}/> {blog.likes} likes</span>
          <span>💬 {comments.length} comments</span>
        </div>
        <button onClick={handleEdit} className='mt-4 bg-blue-500 text-white p-2 rounded cursor-pointer'>Edit</button>
        <div className='mt-6'>
          <h2 className='text-2xl mb-4'>Comments</h2>
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className='mb-2'>
                <p>{comment.text}</p>
                <small>{new Date(comment.date).toLocaleString()}</small>
              </li>
            ))}
          </ul>
          <form onSubmit={handleCommentSubmit} className='mt-4'>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='w-full border-2 p-2'
              placeholder='Add a comment'
            ></textarea>
            <button type='submit' className='mt-2 p-2 bg-stone-950 text-white rounded-md cursor-pointer'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;