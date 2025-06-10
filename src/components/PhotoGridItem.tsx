import type { CSSProperties } from 'react'
import { memo, useMemo } from 'react'
import { Link } from 'react-router'

import type { GridItem } from '../types'

const PhotoGridItem = memo(
	({ alt, height, id, left, src, top, width }: GridItem) => {
		const rootStyle = useMemo<CSSProperties>(
			() => ({
				height,
				left,
				top,
				width,
			}),
			[height, left, top, width]
		)

		return (
			<div className='absolute' style={rootStyle}>
				<Link to={`/photos/${id}`}>
					<img
						alt={alt}
						src={src}
						className='block w-full h-auto object-cover'
					/>
				</Link>
			</div>
		)
	}
)

export default PhotoGridItem
