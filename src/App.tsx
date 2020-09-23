import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';
import AppProviders from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <AppProviders>
      <Routes />
    </AppProviders>
    <GlobalStyle />
  </Router>
);

export default App;
