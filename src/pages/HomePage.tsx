import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { logoutUser } from '../services/auth';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      // Redirect handled by auth observer
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <Container className="mt-8">
      <Box className="text-center">
        <Typography variant="h4" component="h1" className="mb-4">
          Welcome to MountainXifu, {currentUser?.displayName}!
        </Typography>
        <Typography variant="body1" className="mb-8">
          This is the home page of your AI roleplay companion app. Here you'll find your recent chats,
          character recommendations, and more.
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleLogout}
          className="mt-4"
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;