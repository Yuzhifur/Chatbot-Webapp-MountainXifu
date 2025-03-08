import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Link,
  Divider,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { loginUser, resetPassword } from '../../services/auth';

interface LoginFormProps {
  onToggleForm: () => void; // To switch between login and signup
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loginUser(email, password);
      // Redirect will be handled by auth observer
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address to reset password');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setResetSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} className="p-8 max-w-md w-full mx-auto">
      <Typography variant="h5" component="h1" className="text-center mb-6">
        Sign In to MountainXifu
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2"
        />

        <div className="flex justify-end mb-4">
          <Link
            component="button"
            variant="body2"
            onClick={handleResetPassword}
            className="text-sm"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          className="py-3"
        >
          {loading ? <CircularProgress size={24} /> : 'Sign In'}
        </Button>
      </form>

      <Divider className="my-6" />

      <div className="text-center">
        <Typography variant="body2" className="mb-4">
          Don't have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={onToggleForm}
            className="font-medium"
          >
            Sign Up
          </Link>
        </Typography>
      </div>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={resetSent} autoHideDuration={6000} onClose={() => setResetSent(false)}>
        <Alert onClose={() => setResetSent(false)} severity="success" sx={{ width: '100%' }}>
          Password reset email sent. Please check your inbox.
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default LoginForm;