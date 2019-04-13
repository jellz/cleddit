import { h, Component } from 'preact';
import { API_BASE } from '../../.config';

// const COMMON_MAILBOXES = {
//   'outlook.com': 'https://login.live.com',
//   'hotmail.com': 'https://login.live.com',
//   'gmail.com': 'https://mail.google.com'
// }

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: null,
      submitted: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    let res = await fetch(API_BASE + '/api/auth/token', {
      method: 'post',
      body: JSON.stringify({
        user: this.state.emailValue
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error(`Token request failed, code: ${res.status}`);
    this.setState({ submitted: true });
  }

  handleEmailChange(event) {
    this.setState({ emailValue: event.target.value });
  }

	render() {
		return (
			<div>
        <div className='login-container'>
          <h1>Login</h1>
          <p>We use a passwordless authentication system so you don't need to remember another password. <span className='bold'>Just enter your email address below and we'll email you a link you can use to sign in!</span></p>
          { !this.state.submitted && <form onSubmit={this.handleSubmit}>
            <input type='email' required placeholder='john@cleddit.com' autofocus value={this.state.emailValue} onChange={this.handleEmailChange} name='login-email' className='login-email-input' />
            <input type='submit' value='Submit' className='login-submit bold' />
          </form> }
          { this.state.submitted && <div className='login-submitted-text'>
            We have sent an email to your inbox. Click the link in the email to login!<br />
          </div> }
        </div>
      </div>
		)
	}
}