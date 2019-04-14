import { h, Component } from 'preact';
import { checkAuthenticated } from '../../util';
import { route } from 'preact-router';

export default class Home extends Component {
	async componentDidMount() {
		if (!await checkAuthenticated()) return route('/login');
	}

	render() {
		return (
			<div>
				<h1>Welcome home!</h1>
			</div>
		)		
	}
}