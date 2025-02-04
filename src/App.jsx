import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header"
import Blogs from './components/Blogs';
import AddBlog from './components/AddBlog';

function App() {

    return (
        <Router>
            <div className="text-2xl text-black">
                <Header />
            </div>
            <Routes>
                <Route path="/" element={<Blogs />} />
                <Route path="/addblogs" element={<AddBlog />} />
            </Routes>
        </Router>
    )
}

export default App