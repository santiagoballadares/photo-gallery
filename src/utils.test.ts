import { expect, test } from 'vitest'
import { findMinItemIndex } from './utils'

describe('findMinItemIndex', () => {
	const cases: [number[], number][] = [
		[[], -1],
		[[100, 200, 300, 400], 0],
		[[100, 20, 300, 400], 1],
		[[100, 200, 300, 40], 3],
	]

	test.each(cases)(
		'given %o as argument, it should return %i',
		(items: number[], expected: number) => {
			expect(findMinItemIndex(items)).toBe(expected)
		}
	)
})
