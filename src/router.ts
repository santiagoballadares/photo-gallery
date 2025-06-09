import { createBrowserRouter } from 'react-router'
import About from './About'
import App from './App'

const router = createBrowserRouter([
	{ path: '/', Component: App },
	{ path: '/about', Component: About },
])

export default router
