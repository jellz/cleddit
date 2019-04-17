import { h, Component } from 'preact';
import { route } from 'preact-router';
import linkState from 'linkstate';
import '../../../styles/register';
import '../../../styles/forms';

export default class LoginPostToken extends Component {
  constructor() {
    super();

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    usernameValue: null,
    acceptTosValue: false
  }
  
  async componentDidMount() {
    setTimeout(() => { if (this.props.auth) return route('/'); });
    if (!this.props.register_now || !JSON.parse(this.props.register_now)) return this.login();
  }

  async login() {
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

  async register(username) {
    let res = await fetch('/api/auth/register', {
      method: 'post',
      body: JSON.stringify({
        token: this.props.token,
        uid: this.props.uid,
        username
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error(`Register request failed, code: ${res.statusCode}`);
    await this.props.refreshAuthProp();
    route('/');
  }

  handleSubmit(event) {
    event.preventDefault();
    this.register(this.state.usernameValue);
  }

	render() {
		return (
			<div>
        {!this.props.register_now && <div>
          Please wait a moment...
        </div>}
        {(this.props.register_now && JSON.parse(this.props.register_now)) && <div>
          <div className='login-container'>
            <h1>Final steps</h1>
            <p>Since this is your first time logging in to Cleddit, we'd like to confirm some details.</p>
            <form class='pure-form pure-form-aligned' onSubmit={this.handleSubmit}>
              <fieldset>
                <div class='pure-control-group'>
                  <label for='name'>Username</label>
                  <input id='name' type='text' placeholder='CledditUser1235' maxLength={20} minLength={3} required onChange={linkState(this, 'usernameValue')}/>
                </div>

                <div class='pure-controls'>
                  <input type='checkbox' required /> I agree to the <a href='#'>Terms of Service</a>
                  <br />
                  <input type='submit' value='Create Account' class='register-submit'>Submit</input>
                </div>
              </fieldset>
            </form>
          </div>
        </div>}
      </div>
		)
	}
}