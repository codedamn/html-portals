import React, { useState } from 'react'
import './App.css'
import { TextField, Button } from '@material-ui/core'

const portalAvailable = 'HTMLPortalElement' in window

const WarningOrNull = () => {
	if (portalAvailable) {
		return null
	}

	return <div className="not-available">
		<h1>Your browser does not support portals, yet.</h1>
		<p>Click here to check a demonstration</p>
	</div>
}

function App() {

	const [url, setUrl] = useState('')

	function createPortal() {
		[...document.getElementsByTagName('portal')].forEach(t => t.remove())
		const portal = document.createElement('portal')
		portal.src = url
		portal.classList.add('portal-transition')
		portal.addEventListener('click', evt => {
			portal.classList.add('portal-reveal')
		})
		portal.addEventListener('transitionend', evt => {
			if (evt.propertyName === 'transform') {
				portal.activate()
			}
		})
		document.body.appendChild(portal)
	}

	return (
		<div className="root">
			<h1 className="heading">HTML Portals</h1>
			<WarningOrNull />
			<div id="input-field">
				<TextField
					id="outlined-basic"
					label="Enter URL"
					className="input"
					margin="normal"
					onChange={e => setUrl(e.target.value)}
					value={url}
					variant="outlined"
				/>
				<Button variant="contained" color="primary" className="button" onClick={createPortal} disabled={!portalAvailable}>
					Create Portal
				</Button>
			</div>
			<h2 className="heading">More you know</h2>
			<ul className="list">
				<li><a rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/watch?v=X2zqwMBBvIs">Chrome Dev Summit 2019 talk</a></li>
				<li><a rel="noopener noreferrer" target="_blank" href="https://wicg.github.io/portals/">Spec</a></li>
				<li><a rel="noopener noreferrer" target="_blank" href="https://wicg.github.io/portals/">Source code</a></li>
			</ul>
		</div>
	)
}

export default App
