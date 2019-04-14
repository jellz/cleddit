import { h, Component } from 'preact';
import { checkAuthenticated } from '../../util';
import { route } from 'preact-router';
import linkState from 'linkstate';
import '../../styles/login';

const COMMON_INBOXES = {
  'outlook.com': 'https://login.live.com',
  'hotmail.com': 'https://login.live.com',
  'gmail.com': 'https://mail.google.com',
  'yahoo.com': 'https://login.yahoo.com/?.done=https%3A%2F%2Fmail.yahoo.com',
  'icloud.com': 'https://www.icloud.com/',
  'inbox.com': 'https://www.inbox.com/login.aspx?redir=/login.aspx',
  'mail.com': 'https://www.mail.com/int/#.2068504-header-navlogin2-1',
  'aol.com': 'https://login.aol.com',
  'yandex.com': 'https://passport.yandex.com/auth?from=mail',
  'protonmail.com': 'https://mail.protonmail.com/login'
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: null,
      submitted: false,
      inboxUrl: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

	async componentDidMount() {
		if (await checkAuthenticated()) return route('/');
	}

  async handleSubmit(event) {
    event.preventDefault();
    let res = await fetch('/api/auth/token', {
      method: 'post',
      body: JSON.stringify({
        user: this.state.emailValue
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error(`Token request failed, code: ${res.status}`);
    let emailDomain = this.state.emailValue.split('@')[1];
    this.setState({ submitted: true, inboxUrl: COMMON_INBOXES[emailDomain] ? COMMON_INBOXES[emailDomain] : null });
  }

	render() {
		return (
			<div>
        <div className='login-container'>
          <h1>Login</h1>
          <p>We use a passwordless authentication system so you don't need to remember another password. <span className='bold'>Just enter your email address below and we'll email you a link you can use to sign in!</span></p>
          { !this.state.submitted && <form onSubmit={this.handleSubmit}>
            <input type='email' required placeholder='john@cleddit.com' autofocus value={this.state.emailValue} onChange={linkState(this, 'emailValue')} name='login-email' className='login-email-input' />
            <input type='submit' value='Submit' className='login-submit bold' />
          </form> }
          { this.state.submitted && <div className='login-submitted-text'>
            We have sent an email to {this.state.inboxUrl ? <a className='login-inbox-link' href={this.state.inboxUrl}>your inbox</a> : 'your inbox'}. Click the link in the email to login!<br />
          </div> }
        </div>
      </div>
		)
	}
}