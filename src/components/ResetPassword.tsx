import React, { Component, FormEvent, ChangeEvent } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import './Login.css'; // Reusing the same CSS

type ResetPasswordProps = {
  switchToLogin: () => void; // Function to switch back to login page
};

type ResetPasswordState = {
  email: string;
  error: string | null;
  success: string | null;
  loading: boolean;
};

export class ResetPassword extends Component<ResetPasswordProps, ResetPasswordState> {
  constructor(props: ResetPasswordProps) {
    super(props);

    this.state = {
      email: '',
      error: null,
      success: null,
      loading: false
    };
  }

  handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { email } = this.state;

    if (!email) {
      this.setState({ error: 'Please enter your email address' });
      return;
    }

    try {
      this.setState({ loading: true, error: null, success: null });
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      this.setState({
        success: 'Password reset email sent! Check your inbox.',
        loading: false
      });
    } catch (error: any) {
      console.error('Reset password error:', error);
      let errorMessage = 'Failed to send reset email';

      // Handle specific Firebase errors
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
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
    const { email, error, success, loading } = this.state;
    const { switchToLogin } = this.props;

    return (
      <div className="login-container">
        <div className="login-form-wrapper">
          <h1 className="login-title">Mountain Xifu</h1>
          <h2 className="login-subtitle">Reset Password</h2>

          <form className="login-form" onSubmit={this.handleSubmit}>
            {error && <div className="login-error">{error}</div>}
            {success && <div className="login-success">{success}</div>}

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

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>

            <div className="login-links">
              <button
                type="button"
                className="text-button"
                onClick={switchToLogin}
                disabled={loading}
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}