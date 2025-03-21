import React, { Component, FormEvent, ChangeEvent } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

type LoginProps = {
  switchToCreateAccount: () => void;
  switchToResetPassword: () => void;
};

type LoginState = {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
};

export class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
      loading: false
    };
  }

  handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: 'Please enter both email and password' });
      return;
    }

    try {
      this.setState({ loading: true, error: null });
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      // After successful login, parent component will handle redirect
      // based on the auth state change
    } catch (error) {
      console.error('Login error:', error);
      this.setState({
        error: 'Failed to login. Please check your email and password.',
        loading: false
      });
    }
  };

  render() {
    const { email, password, error, loading } = this.state;
    const { switchToCreateAccount, switchToResetPassword } = this.props;

    return (
      <div className="login-container">
        <div className="login-form-wrapper">
          <h1 className="login-title">Mountain Xifu</h1>
          <h2 className="login-subtitle">Roleplay Chatbot</h2>

          <form className="login-form" onSubmit={this.handleSubmit}>
            {error && <div className="login-error">{error}</div>}

            <div className="login-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={this.handleEmailChange}
                disabled={loading}
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={this.handlePasswordChange}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="login-links">
              <button
                type="button"
                className="text-button"
                onClick={switchToCreateAccount}
                disabled={loading}
              >
                Create a new account
              </button>
              <button
                type="button"
                className="text-button"
                onClick={switchToResetPassword}
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}