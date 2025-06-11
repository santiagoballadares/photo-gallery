import type { CSSProperties } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router'

import type { GridItem } from '../types'

const PhotoGridItem = memo(
	({ alt, height, id, left, src, top, width }: GridItem) => {
		const [imageLoaded, setImageLoaded] = useState(false)

		const rootStyle = useMemo<CSSProperties>(
			() => ({
				height,
				left,
				top,
				width,
			}),
			[height, left, top, width]
		)

		const onImageLoad = useCallback(() => {
			setImageLoaded(true)
		}, [])

		return (
			<div className='absolute' style={rootStyle}>
				<Link to={`/photos/${id}`}>
					<img
						alt={alt}
						src={src}
						className='block w-full h-auto object-cover'
						style={{ display: imageLoaded ? 'block' : 'none' }}
						onLoad={onImageLoad}
					/>
				</Link>
				{!imageLoaded && <div className='loading-block' />}
			</div>
		)
	}
)

export default PhotoGridItem
