import React from 'react';
import { Box } from '@chakra-ui/react';
import Hero from './HomeComponents/Hero';
import Features from './HomeComponents/Features';
import FeaturedProfessionalsSection from './HomeComponents/FeaturedProfessionalsSection';

const Home: React.FC = () => {
  return (
    <Box p={4}>
        <Hero/>
        <Features/>
        <FeaturedProfessionalsSection/>
    </Box>
  );
};
export default Home;
