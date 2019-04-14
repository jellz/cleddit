import { h, Component } from 'preact';
import { API_BASE } from '../../../.config';
import { route } from 'preact-router';

export default class LoginPostToken extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let res = await fetch(API_BASE + '/api/auth/login', {
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