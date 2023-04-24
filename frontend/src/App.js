import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { UserProvider } from './context/UserContext';

import ContainerRoutes from './routes';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <GlobalStyles />
        <ContainerRoutes />
        <ToastContainer autoClose={3000} className="tostify-style" />
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
