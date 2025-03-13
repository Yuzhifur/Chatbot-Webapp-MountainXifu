import React, { Component } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Login } from './components/Login';
import './App.css';

type AppProps = {};

type AppState = {
  user: User | null;
  loading: boolean;
};

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    // Hide firebase welcome content when reac app mounts
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

  renderContent() {
    const { user, loading } = this.state;

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (!user) {
      return <Login />;
    }

    return (
      <div className="dashboard">
        <h1>Welcome, {user.email}</h1>
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

  render() {
    return (
      <div className="app">
        {this.renderContent()}
      </div>
    );
  }
}

export default App;