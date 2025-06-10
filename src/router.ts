import { createBrowserRouter, redirect } from 'react-router'
import type { Photo, Photos } from './apiService'
import { ApiHelper, MAX_ITEMS_PER_PAGE } from './apiService'
import AppLayout from './AppLayout'
import ErrorMessage from './components/ErrorMessage'
import Loading from './components/Loading'
import NotFound from './components/NotFound'
import PhotoDetails from './components/PhotoDetails'
import PhotosGrid from './components/PhotosGrid'

const router = createBrowserRouter([
	{
		path: '/',
		loader: () => redirect('/photos'),
	},
	{
		path: '/photos',
		Component: AppLayout,
		children: [
			{
				index: true,
				loader: async () => {
					const api = ApiHelper.getInstance()
					try {
						const res: Photos = await api.fetchPhotos({
							per_page: MAX_ITEMS_PER_PAGE,
						})
						return { initialPhotos: res.photos }
					} catch (error) {
						console.error('An error occurred during data fetching:', error)
						return []
					}
				},
				Component: PhotosGrid,
				ErrorBoundary: ErrorMessage,
				HydrateFallback: Loading,
			},
			{
				path: ':photoId',
				loader: async ({ params }) => {
					const api = ApiHelper.getInstance()
					try {
						const res: Photo = await api.fetchPhoto(params.photoId as string)
						return { photo: res }
					} catch (error) {
						console.error('An error occurred during data fetching:', error)
						return null
					}
				},
				Component: PhotoDetails,
				ErrorBoundary: ErrorMessage,
				HydrateFallback: Loading,
			},
		],
	},
	{
		path: '*',
		Component: NotFound,
	},
])

export default router
