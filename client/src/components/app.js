import { h, Component } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Login from '../routes/login';

export default class App extends Component {
	
	handleRouteChange = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Router onChange={this.handleRouteChange}>
					<Home path="/" />
					<Login path="/login" />
				</Router>
			</div>
		);
	}
}
