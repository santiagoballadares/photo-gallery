import { Outlet } from 'react-router'

function App() {
	return (
		<>
			<main className='p-4'>
				<Outlet />
			</main>
			<footer className='flex flex-col items-center justify-center'>
				<p>
					&copy; {new Date().getFullYear()} Photo Gallery.{' '}
					<strong>
						<a href='https://www.pexels.com'>Photos provided by Pexels</a>
					</strong>
				</p>
			</footer>
		</>
	)
}

export default App
