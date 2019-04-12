import { h, Component } from 'preact';

// const COMMON_MAILBOXES = {
//   'outlook.com': 'https://login.live.com',
//   'hotmail.com': 'https://login.live.com',
//   'gmail.com': 'https://mail.google.com'
// }

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: null
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    alert('submitted');
  }

  handleEmailChange(event) {
    this.setState({ emailValue: event.target.value });
  }

	render() {
		return (
			<div>
        <div className='login-container'>
          <h1>Login</h1>
          <p>We use a passwordless authentication system, so you don't need to remember another password. <span className='bold'>Just enter your email address below and we'll email you a link you can use to sign in!</span></p>
          <form onSubmit={this.handleSubmit}>
            <input type='email' required placeholder='john@cleddit.com' autofocus value={this.state.emailValue} onChange={this.handleEmailChange} name='login-email' className='login-email-input' />
            <input type='submit' value='Submit' className='login-submit bold' />
          </form>
        </div>
      </div>
		)
	}
}