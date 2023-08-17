// Button.tsx
import React from 'react';
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

interface Props extends ButtonProps {
  // Ajoutez des props spécifiques au bouton si nécessaire
}

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return <ChakraButton {...rest}>{children}</ChakraButton>;
};

export default Button;
