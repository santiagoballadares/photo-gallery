import { Outlet } from 'react-router'

function App() {
	return (
		<>
			<main className='min-h-screen bg-gray-100 p-4'>
				<Outlet />
			</main>
			<footer className='flex flex-col items-center justify-center'>
				<p>&copy; {new Date().getFullYear()} Photo Gallery</p>
			</footer>
		</>
	)
}

export default App
