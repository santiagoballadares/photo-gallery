export const findMinItemIndex = (items: number[]): number => {
	if (items.length === 0) return -1

	const itemsCount = items.length
	let minItemIndex = 0

	for (let i = 1; i < itemsCount; i++) {
		if (items[i] < items[minItemIndex]) {
			minItemIndex = i
		}
	}

	return minItemIndex
}
