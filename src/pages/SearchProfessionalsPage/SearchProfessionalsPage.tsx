import React from 'react';
import { Container } from '@chakra-ui/react';
import SearchBar from './SearchProfessionalsComponents/SearchBar';
import ProfessionalList from './SearchProfessionalsComponents/ProfessionalList';


const SearchProfessionalsPage: React.FC = () => {
  return (
    <>
      <Container maxW="container.xl" mt={20}>
       <SearchBar/>
       <ProfessionalList/>
      </Container>
    </>
  );
};

export default SearchProfessionalsPage;
