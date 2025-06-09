import { Link } from 'react-router'

export default function NotFoundView() {
	return (
		<div className='bg-gray-100 flex items-center justify-center min-h-screen'>
			<div className='text-center p-8 bg-white shadow-lg rounded-lg'>
				<h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
				<p className='text-2xl text-gray-600 mb-4'>
					The page you're looking for doesn't exist.
				</p>
				<p className='text-lg text-gray-500 mb-8'>
					It might have been moved or deleted.
				</p>
				<Link
					className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300'
					to={'/'}
				>
					Go to Homepage
				</Link>
			</div>
		</div>
	)
}
