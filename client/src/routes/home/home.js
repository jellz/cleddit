import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class Home extends Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		console.log(this.props.auth);
		setTimeout(() => { if (!this.props.auth) return route('/login'); });
		console.log(this.props);
	}

	render() {
		return (
			<div>
				<h1>{JSON.stringify(this.props.auth)}</h1>
			</div>
		)
	}
}