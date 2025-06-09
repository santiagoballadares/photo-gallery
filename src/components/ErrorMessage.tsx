import { useRouteError, isRouteErrorResponse } from 'react-router'

export default function ErrorPage() {
	const error: unknown = useRouteError()

	console.error(error)

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return (
				<div className='error-container'>
					<h1>404 - Not Found</h1>
					<p>The page or resource you requested could not be found.</p>
					<p>
						<i>{error.statusText}</i>
					</p>
					{error.data && <p>Details: {error.data}</p>}
				</div>
			)
		} else if (error.status === 401 || error.status === 403) {
			return (
				<div className='error-container'>
					<h1>Unauthorized Access</h1>
					<p>You don't have permission to view this content.</p>
					<p>
						<i>{error.statusText}</i>
					</p>
				</div>
			)
		} else if (error.status >= 500 && error.status < 600) {
			return (
				<div className='error-container'>
					<h1>Server Error {error.status}</h1>
					<p>Something went wrong on our end. Please try again later.</p>
					<p>
						<i>{error.statusText}</i>
					</p>
				</div>
			)
		} else {
			return (
				<div className='error-container'>
					<h1>An HTTP error occurred!</h1>
					<p>Status: {error.status}</p>
					<p>
						<i>{error.statusText || 'Unknown HTTP Error'}</i>
					</p>
				</div>
			)
		}
	} else if (error instanceof Error) {
		return (
			<div className='error-container'>
				<h1>Application Error</h1>
				<p>An unexpected error occurred:</p>
				<pre>{error.message}</pre>
				{import.meta.env.MODE === 'development' && <pre>{error.stack}</pre>}
			</div>
		)
	} else if (typeof error === 'string') {
		return (
			<div className='error-container'>
				<h1>An error occurred!</h1>
				<p>Error message: {error}</p>
			</div>
		)
	} else {
		return (
			<div className='error-container'>
				<h1>Unknown Error</h1>
				<p>An unknown error has occurred.</p>
			</div>
		)
	}
}
