import React from 'react';
import { ChakraProvider , extendTheme} from '@chakra-ui/react';
import Routes from './routes/routes';

const theme = extendTheme({
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Poppins, sans-serif',   
  },

});

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  );
};

export default App;
