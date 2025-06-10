import type { PaginationParams, Photo, Photos } from 'pexels'
import { createClient } from 'pexels'

// See https://www.pexels.com/api/documentation/#pagination
const MAX_ITEMS_PER_PAGE = 80

type FetchParams = PaginationParams & { query?: string }

const apiKey = import.meta.env.VITE_PEXELS_API_KEY

class ApiHelper {
	private static instance: ApiHelper
	private readonly pexelsClient: ReturnType<typeof createClient>

	private constructor() {
		this.pexelsClient = createClient(apiKey)
	}

	public static getInstance(): ApiHelper {
		if (!ApiHelper.instance) {
			ApiHelper.instance = new ApiHelper()
		}
		return ApiHelper.instance
	}

	public async fetchPhotos(params?: FetchParams): Promise<Photos> {
		const { page, per_page, query } = params ?? {}
		const paginationParams = {
			...(page ? { page } : {}),
			...(per_page ? { per_page: Math.min(per_page, MAX_ITEMS_PER_PAGE) } : {}),
		}

		try {
			const response = query
				? await this.pexelsClient.photos.search({ query, ...paginationParams })
				: await this.pexelsClient.photos.curated(paginationParams)

			if ('error' in response) {
				throw new Error(response.error)
			}

			return response
		} catch (error) {
			console.error(`Error fetching photos:`, error)
			throw error
		}
	}

	public async fetchPhoto(id: string | number): Promise<Photo> {
		try {
			const response = await this.pexelsClient.photos.show({ id })

			if ('error' in response) {
				throw new Error(response.error)
			}

			return response
		} catch (error) {
			console.error(`Error fetching photo with id "${id}":`, error)
			throw error
		}
	}
}

export { ApiHelper, MAX_ITEMS_PER_PAGE }
export type { FetchParams, Photo, Photos }
