import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Blogs from './components/Blogs';
import AddBlog from './components/AddBlog';
import BlogDetail from './components/BlogDetail';
import EditBlog from './components/EditBlog'; // Import the EditBlog component

function App() {
    return (
        <Router>
            <div className="text-2xl">
                <Header />
            </div>
            <Routes>
                <Route path="/" element={<Blogs />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/editblog/:id" element={<EditBlog />} /> 
                <Route path="/blog/:id" element={<BlogDetail />} />
            </Routes>
        </Router>
    )
}

export default App;