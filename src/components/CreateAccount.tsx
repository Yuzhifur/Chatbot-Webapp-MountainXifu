import React, { Component, FormEvent, ChangeEvent } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './Login.css'; // Reusing the same CSS

type CreateAccountProps = {
  switchToLogin: () => void; // Function to switch back to login page
};

type CreateAccountState = {
  email: string;
  password: string;
  confirmPassword: string;
  error: string | null;
  loading: boolean;
};

export class CreateAccount extends Component<CreateAccountProps, CreateAccountState> {
  constructor(props: CreateAccountProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
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

  handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ confirmPassword: e.target.value });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { email, password, confirmPassword } = this.state;

    // Basic validation
    if (!email || !password || !confirmPassword) {
      this.setState({ error: 'Please fill in all fields' });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }

    if (password.length < 6) {
      this.setState({ error: 'Password must be at least 6 characters' });
      return;
    }

    try {
      this.setState({ loading: true, error: null });
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      // After successful account creation, auth state change will handle redirect
    } catch (error: any) {
      console.error('Account creation error:', error);
      let errorMessage = 'Failed to create account';

      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already in use';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }

      this.setState({
        error: errorMessage,
        loading: false
      });
    }
  };

  render() {
    const { email, password, confirmPassword, error, loading } = this.state;
    const { switchToLogin } = this.props;

    return (
      <div className="login-container">
        <div className="login-form-wrapper">
          <h1 className="login-title">Mountain Xifu</h1>
          <h2 className="login-subtitle">Create Account</h2>

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

            <div className="login-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={this.handleConfirmPasswordChange}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="login-links">
              <button
                type="button"
                className="text-button"
                onClick={switchToLogin}
                disabled={loading}
              >
                Already have an account? Login instead
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}