import React, { useState, useEffect } from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { onAuthStateChange } from '../services/auth';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        // Redirect to home page if user is logged in
        navigate('/');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container maxWidth="sm">
        <Box className="my-8">
          <Paper elevation={0} className="p-4 mb-6 text-center bg-transparent">
            <Typography variant="h4" component="h1" className="font-bold text-primary-dark">
              MountainXifu
            </Typography>
            <Typography variant="subtitle1" className="mt-2 text-gray-600">
              Your AI Roleplay Companion
            </Typography>
          </Paper>

          {isLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <SignupForm onToggleForm={toggleForm} />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default AuthPage;