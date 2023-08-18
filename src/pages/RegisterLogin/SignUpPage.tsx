// src/pages/SignUpPage.tsx
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import SignUp from './RegisterLoginComponents/SignUp';

const SignUpPage: React.FC = () => {
  return (
    <Box>
      <Heading>Inscription</Heading>
      <SignUp/>
    </Box>
  );
};

export default SignUpPage;