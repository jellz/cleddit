import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { checkAuthenticated } from './util';

// Code-splitting is automated for routes
import Home from './routes/home/home.js';
import Login from './routes/login/login.js';
import LoginPostToken from './routes/login/token/token.js';

export default class App extends Component {
	constructor() {
		super();
		this.refreshAuthProp = this.refreshAuthProp.bind(this);
	}

	state = {
		authenticated: null
	}

	async refreshAuthProp() {
		console.log('REFRESHING AUTH PROP !!!!');
		this.setState({ authenticated: await checkAuthenticated() });
	}

	componentDidMount() {
		this.refreshAuthProp();
		console.log('APP MOUNTED');
	}

	// handleRouteChange = e => {
	// 	this.currentUrl = e.url;
	// };

	render() {
		return (
			<div id="app">
				<Router onChange={this.handleRouteChange}>
					<Home path="/" auth={this.state.authenticated} />
					<Login path="/login" auth={this.state.authenticated} />
					<LoginPostToken path="/login/token/:token/:uid" auth={this.state.authenticated} refreshAuthProp={this.refreshAuthProp} />
				</Router>
			</div>
		);
	}
}
