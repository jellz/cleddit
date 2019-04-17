import { h, Component } from 'preact';
import { route } from 'preact-router';
import '../../../styles/login';

export default class LoginPostToken extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
		setTimeout(() => { if (this.props.auth) return route('/'); });
    let res = await fetch('/api/auth/login', {
      method: 'post',
      body: JSON.stringify({
        token: this.props.token,
        uid: this.props.uid
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error(`Login request failed, code: ${res.statusCode}`);
    await this.props.refreshAuthProp();
    route('/');
  }

	render() {
		return (
			<div>
        Please wait a few seconds...
      </div>
		)
	}
}