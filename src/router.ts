import { createBrowserRouter, redirect } from 'react-router'
import AppLayout from './AppLayout'
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
			{ index: true, Component: PhotosGrid },
			{
				path: ':photoId',
				loader: async ({ params }) => {
					return { id: params.photoId }
				},
				Component: PhotoDetails,
			},
		],
	},
	{
		path: '*',
		Component: NotFound,
	},
])

export default router
