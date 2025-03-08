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
  Alert,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { registerUser } from '../../services/auth';

interface SignupFormProps {
  onToggleForm: () => void; // To switch between login and signup
}

const SignupForm: React.FC<SignupFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!termsAccepted) {
      setError('You must accept the terms and conditions');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await registerUser(email, password, displayName);
      // Redirect will be handled by auth observer
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} className="p-8 max-w-md w-full mx-auto">
      <Typography variant="h5" component="h1" className="text-center mb-6">
        Create Your MountainXifu Account
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Display Name"
          variant="outlined"
          fullWidth
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="mb-4"
        />

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
          className="mb-4"
          helperText="Password must be at least 6 characters"
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          required
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4"
          error={password !== confirmPassword && confirmPassword !== ''}
          helperText={
            password !== confirmPassword && confirmPassword !== ''
              ? 'Passwords do not match'
              : ''
          }
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              name="termsAccepted"
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{' '}
              <Link href="#" target="_blank" rel="noopener">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" target="_blank" rel="noopener">
                Privacy Policy
              </Link>
            </Typography>
          }
          className="mb-4"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading || !termsAccepted}
          className="py-3"
        >
          {loading ? <CircularProgress size={24} /> : 'Create Account'}
        </Button>
      </form>

      <Divider className="my-6" />

      <div className="text-center">
        <Typography variant="body2" className="mb-4">
          Already have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={onToggleForm}
            className="font-medium"
          >
            Sign In
          </Link>
        </Typography>
      </div>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SignupForm;