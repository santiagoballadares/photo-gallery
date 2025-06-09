import type { Photo, Photos } from 'pexels'
import { createClient } from 'pexels'

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

	public async fetchPhotos(query?: string): Promise<Photos> {
		try {
			const response = query
				? await this.pexelsClient.photos.search({ query })
				: await this.pexelsClient.photos.curated()

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

export { ApiHelper }
export type { Photo, Photos }
