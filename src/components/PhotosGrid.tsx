import { useState } from 'react'
import { Link, useLoaderData } from 'react-router'

import type { Photo } from '../apiService'

function PhotosGrid() {
	const { initialPhotos }: { initialPhotos: Photo[] } = useLoaderData()

	const [photos, _setPhotos] = useState<Photo[]>(initialPhotos)

	return (
		<div className='container mx-auto'>
			<h1 className='text-3xl font-bold text-gray-800 mb-4 sm:mb-0'>
				Photo Gallery
			</h1>

			<div className='flex flex-wrap'>
				{photos.map((photo) => (
					<Link
						key={photo.id}
						to={`/photos/${photo.id}`}
						className='p-1 box-border transition-transform duration-100 ease-out'
					>
						<img
							src={photo.src.medium}
							alt={photo.alt || `Photo ${photo.id}`}
							className='w-full h-full object-cover rounded shadow-md'
							loading='lazy'
						/>
					</Link>
				))}
			</div>
		</div>
	)
}

export default PhotosGrid
