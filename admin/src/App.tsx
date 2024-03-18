import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Nav from './components/nav/Index';
import Footer from './components/footer/Index';
function App() {
  return (
    <>
      <Nav />
      <Container className='ms-0 py-4'>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Container>
      <Footer />
    </>
  );
}

export default App;
