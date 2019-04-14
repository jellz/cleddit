import { h, Component } from 'preact';
import cookies from 'browser-cookies';

export default class Home extends Component {
	componentDidMount() {
		if (!cookies.get('cleddit_session')) return window.location.href = '/login';
	}

	render() {
		return (
			<div>
				<h1>Welcome home!</h1>
			</div>
		)		
	}
}