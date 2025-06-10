import debounce from 'lodash/debounce'
import type { UIEvent } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLoaderData } from 'react-router'

import type { Photo } from '../apiService'
import { ApiHelper } from '../apiService'
import {
	COLUMN_WIDTH,
	DEFAULT_DEBOUNCE,
	RESIZE_DEBOUNCE,
	SCROLL_DEBOUNCE,
	VIEWPORT_BUFFER,
} from '../constants'
import { findMinItemIndex } from '../utils'

import PhotoGridItem from './PhotoGridItem'
import type { GridItem } from './types'

const api = ApiHelper.getInstance()

export default function PhotosGrid() {
	const { initialPhotos }: { initialPhotos: Photo[] } = useLoaderData()
	const [photos, setPhotos] = useState<Photo[]>(initialPhotos)
	const [gridItems, setGridItems] = useState<GridItem[]>([])

	const containerRef = useRef<HTMLDivElement | null>(null)
	const [containerHeight, setContainerHeight] = useState(0)
	const [totalGridHeight, setTotalGridHeight] = useState(0)

	const [scrollPosition, setScrollPosition] = useState(0)

	const [debouncedQuery, setDebouncedQuery] = useState<string>('')
	const [query, setQuery] = useState<string>('')

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedQuery(query.trim())
		}, DEFAULT_DEBOUNCE)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [query])

	useEffect(() => {
		api.fetchPhotos(debouncedQuery).then((value) => {
			setPhotos(value.photos)
		})
	}, [debouncedQuery])

	const calculateLayout = useCallback(() => {
		if (!containerRef.current || photos.length === 0) {
			setGridItems([])
			setTotalGridHeight(0)
			return
		}

		const currentContainerWidth = containerRef.current.clientWidth
		const estimatedColumnCount = Math.max(
			1,
			Math.floor(currentContainerWidth / COLUMN_WIDTH)
		)

		const columnHeights = Array(estimatedColumnCount).fill(0)

		const updatedGridItems: GridItem[] = photos.map((photo) => {
			const columnIndex = findMinItemIndex(columnHeights)
			const itemLeft = columnIndex * COLUMN_WIDTH
			const itemTop = columnHeights[columnIndex]
			const aspectRatio = photo.width / photo.height
			const itemRenderHeight = COLUMN_WIDTH / aspectRatio

			columnHeights[columnIndex] += itemRenderHeight

			return {
				alt: photo.alt,
				height: itemRenderHeight,
				id: photo.id,
				left: itemLeft,
				src: photo.src.original,
				top: itemTop,
				width: COLUMN_WIDTH,
			}
		})

		setGridItems(updatedGridItems)
		setTotalGridHeight(Math.max(...columnHeights))
	}, [photos])

	useEffect(() => {
		calculateLayout()

		const onResize = debounce(() => {
			calculateLayout()

			if (containerRef.current) {
				setContainerHeight(containerRef.current.clientHeight)
			}
		}, RESIZE_DEBOUNCE)

		window.addEventListener('resize', onResize)

		if (containerRef.current) {
			setContainerHeight(containerRef.current.clientHeight)
		}

		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [calculateLayout])

	const visibleGridItems = useMemo<GridItem[]>(() => {
		if (gridItems.length === 0 || containerHeight === 0) {
			return []
		}

		const viewportStart = scrollPosition
		const viewportEnd = scrollPosition + containerHeight

		const bufferedViewportStart =
			viewportStart - containerHeight * VIEWPORT_BUFFER
		const bufferedViewportEnd = viewportEnd + containerHeight * VIEWPORT_BUFFER

		const startIndex = gridItems.findIndex(
			(item) => item.top + item.height > bufferedViewportStart
		)

		if (startIndex === -1) return []

		const endIndex = gridItems.findIndex(
			(item) => item.top >= bufferedViewportEnd
		)

		return gridItems.slice(
			startIndex,
			endIndex === -1 ? gridItems.length : endIndex
		)
	}, [containerHeight, gridItems, scrollPosition])

	const onScroll = debounce((e: UIEvent<HTMLDivElement>) => {
		setScrollPosition(e.currentTarget.scrollTop)
	}, SCROLL_DEBOUNCE)

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
			<div
				ref={containerRef}
				className='relative h-full overflow-y-scroll will-change-transform'
				onScroll={onScroll}
			>
				<div
					className='relative w-full'
					style={{ height: `${totalGridHeight}px` }}
				>
					{visibleGridItems.map((item) => (
						<PhotoGridItem
							alt={item.alt}
							height={item.height}
							id={item.id}
							key={item.id}
							left={item.left}
							src={item.src}
							top={item.top}
							width={item.width}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
