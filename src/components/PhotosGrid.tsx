import { useState } from 'react'
import { Link } from 'react-router'

function PhotosGrid() {
	const [photos, _setPhotos] = useState<{ id: number }[]>([
		{ id: 32460307 },
		{ id: 20351658 },
		{ id: 32420643 },
	])

	return (
		<div className='container mx-auto'>
			<h1 className='text-3xl font-bold text-gray-800 mb-4 sm:mb-0'>
				Photo Gallery
			</h1>

			<div className='flex'>
				{photos.map(({ id }) => (
					<Link to={`/photos/${id}`} key={id}>
						<div className='bg-white rounded-lg p-6 m-4'>{id}</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default PhotosGrid
