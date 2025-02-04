import { Link } from 'react-router-dom';
import { Search, PenLine } from 'lucide-react';

const Header = () => {
	return (
		<>
			<div className="flex items-center justify-between h-20 w-full bg-stone-900 text-white scheme-dark">
				<div className="mx-10 my-5">
					<Link to="/" className='flex'>
						<h1>BlogBuddy</h1>
					</Link>
				</div>
				<div className='flex border gap-5 text-stone-400 border-stone-400 focus-within:border-gray-100 focus-within:text-white p-2 rounded-full transition delay-150 duration-300 ease-in-out'>
					<Search size={30} className='ml-1' />
					<form action="">
						<input className='outline-0' type="text" name="search" id="" placeholder='Search' />
					</form>
				</div>
				<div className='mx-10 gap-5 text-stone-400 border-stone-400 hover:border-gray-100 hover:text-white p-2 rounded-full transition delay-150 duration-300 ease-in-out'>
					<Link to="/addblogs" className='flex'>
						<PenLine size={30} />
						<h1>Write</h1>
					</Link>
				</div>
			</div>
		</>
	)
}

export default Header