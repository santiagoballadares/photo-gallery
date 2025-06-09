import { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router'

import type { Photo } from '../apiService'
import { ApiHelper } from '../apiService'
import { DEFAULT_DEBOUNCE } from '../constants'

function PhotosGrid() {
	const { initialPhotos }: { initialPhotos: Photo[] } = useLoaderData()

	const [debouncedQuery, setDebouncedQuery] = useState<string>('')
	const [photos, setPhotos] = useState<Photo[]>(initialPhotos)
	const [query, setQuery] = useState<string>('')

	const api = ApiHelper.getInstance()

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedQuery(query)
		}, DEFAULT_DEBOUNCE)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [query])

	useEffect(() => {
		api.fetchPhotos(debouncedQuery.trim()).then((value) => {
			setPhotos(value.photos)
		})
	}, [debouncedQuery, api])

	return (
		<div className='container mx-auto'>
			<div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold text-gray-800 mb-4 sm:mb-0'>
					Photo Gallery
				</h1>
				<input
					type='text'
					placeholder='Search photos...'
					className='w-full sm:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					onChange={(e) => setQuery(e.target.value)}
					value={query}
				/>
			</div>
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
