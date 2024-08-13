import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navigation from './components/Nav/Nav';
import Container from '@mui/material/Container';

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;