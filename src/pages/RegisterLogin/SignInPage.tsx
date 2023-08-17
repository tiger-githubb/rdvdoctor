// src/pages/SignInPage.tsx
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import SignIn from './RegisterLoginComponents/SignIn';

const SignInPage: React.FC = () => {
  return (
    <Box>
      <Heading>Connexion</Heading>
      <SignIn/>
    </Box>
  );
};

export default SignInPage;
