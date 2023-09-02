import React from 'react';
import { Box } from '@chakra-ui/react';
import Hero from './HomeComponents/Hero';
import Features from './HomeComponents/Features';
import FeaturedProfessionalsSection from './HomeComponents/FeaturedProfessionalsSection';
import FeaturedHospitalsSection from './HomeComponents/FeaturedHospitalsSection';
import CallToAction from '../../components/CallToAction';

const Home: React.FC = () => {

  return (
    <Box p={4}>
      <Hero />
      <Features />
      <FeaturedProfessionalsSection />
      <FeaturedHospitalsSection />
      <CallToAction />
    </Box>
  );
};
export default Home;
