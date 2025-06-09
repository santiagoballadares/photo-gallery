import { NavLink } from 'react-router'

function About() {
	return (
		<>
			<h1>About</h1>
			<div className='card'>
				<p>
					Edit <code>src/About.tsx</code> and save to test HMR
				</p>
				<NavLink to='/' end>
					Go Back
				</NavLink>
			</div>
		</>
	)
}

export default About
