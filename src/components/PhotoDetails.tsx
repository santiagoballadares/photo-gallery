import { Link, useLoaderData } from 'react-router'

export default function PhotoDetails() {
	const { id } = useLoaderData()

	return (
		<div className='container mx-auto'>
			<div className='mb-6'>
				<Link
					className='flex items-center text-blue-600 hover:text-blue-800 font-semibold'
					to={'/'}
				>
					<svg
						className='w-4 h-4 mr-1'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							stroke-linecap='round'
							stroke-linejoin='round'
							stroke-width='2'
							d='M15 19l-7-7 7-7'
						/>
					</svg>
					Back to Gallery
				</Link>
			</div>

			<div className='bg-white rounded-lg shadow-lg overflow-hidden md:flex'>
				<p className='mb-1'>ID: {id}</p>
			</div>
		</div>
	)
}
