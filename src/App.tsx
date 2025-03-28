import React, { Component } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Login } from './components/Login';
import { CreateAccount } from './components/CreateAccount';
import { ResetPassword } from './components/ResetPassword';
import Sidebar from './components/Sidebar';
import './App.css';

type AppProps = {};

type AppState = {
  user: User | null;
  loading: boolean;
  authView: 'login' | 'createAccount' | 'resetPassword';
  dashboardContent: 'default' | 'other'; // Can add more content types as needed
};

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      user: null,
      loading: true,
      authView: 'login',
      dashboardContent: 'default'
    };
  }

  componentDidMount() {
    // Hide firebase welcome content when react app mounts
    const messageEl = document.getElementById('message');
    const loadEl = document.getElementById('load');

    if (messageEl) messageEl.style.display = 'none';
    if (loadEl) loadEl.style.display = 'none';

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.setState({
        user,
        loading: false
      });
    });
  }

  doSwitchToLogin = () => {
    this.setState({ authView: 'login' });
  };

  doSwitchToCreateAccount = () => {
    this.setState({ authView: 'createAccount' });
  };

  doSwitchToResetPassword = () => {
    this.setState({ authView: 'resetPassword' });
  };

  doResetDashboard = () => {
    this.setState({ dashboardContent: 'default' });
  };

  renderAuthContent() {
    const { authView } = this.state;

    switch (authView) {
      case 'createAccount':
        return <CreateAccount doSwitchToLogin={this.doSwitchToLogin} />;
      case 'resetPassword':
        return <ResetPassword doSwitchToLogin={this.doSwitchToLogin} />;
      case 'login':
      default:
        return <Login
          doSwitchToCreateAccount={this.doSwitchToCreateAccount}
          doSwitchToResetPassword={this.doSwitchToResetPassword}
        />;
    }
  }

  renderDashboardContent() {
    const { user, dashboardContent } = this.state;

    // Currently only have default content, but can expand this switch statement in the future
    switch (dashboardContent) {
      case 'default':
      default:
        return (
          <div className="dashboard">
            <h1>Welcome, {user?.email}</h1>
            <p>Main dashboard content will go here.</p>
            <button
              onClick={() => getAuth().signOut()}
              className="logout-button"
            >
              Sign Out
            </button>
          </div>
        );
    }
  }

  renderContent() {
    const { user, loading } = this.state;

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (!user) {
      return this.renderAuthContent();
    }

    return (
      <div className="dashboard-container">
        <Sidebar doResetDashboard={this.doResetDashboard} />
        <div className="main-content">
          {this.renderDashboardContent()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="app">
        {this.renderContent()}
      </div>
    );
  }
}

export default App;