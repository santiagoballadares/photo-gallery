import { Link, useLoaderData } from 'react-router'

import type { Photo } from '../apiService'

export default function PhotoDetails() {
	const { photo }: { photo: Photo | null } = useLoaderData()

	return (
		<div className='container mx-auto'>
			<div className='mb-6'>
				<Link
					className='flex items-center hover:font-bold font-semibold'
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
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M15 19l-7-7 7-7'
						/>
					</svg>
					Back to Gallery
				</Link>
			</div>

			{photo && (
				<div className='bg-secondary rounded-lg shadow-lg overflow-hidden md:flex'>
					<div className='md:w-2/3'>
						<img
							src={photo.src.original}
							alt={photo.alt || `Photo ${photo.id}`}
							className='w-full h-auto object-cover'
						/>
					</div>
					<div className='md:w-1/3 p-6 flex flex-col justify-between'>
						<div>
							<h3 className='text-3xl font-bold mb-2'>
								{photo.alt || `Photo ${photo.id}`}
							</h3>
							<div className='text-sm'>
								<p className='mb-1 break-all'>
									<strong className='font-semibold'>Photographer:</strong>{' '}
									{photo.photographer}
								</p>
								<p className='mb-1 break-all'>
									<strong className='font-semibold'>Url:</strong>{' '}
									{photo.photographer_url}
								</p>
								<p>
									<strong className='font-semibold'>Liked:</strong>{' '}
									{photo.liked ? 'Yes' : 'No'}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
