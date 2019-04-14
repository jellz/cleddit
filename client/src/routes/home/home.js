import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class Home extends Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		setTimeout(() => { if (!this.props.auth) return route('/login'); });
	}

	render() {
		return (
			<div>
				<h1>Welcome home!</h1>
			</div>
		)		
	}
}