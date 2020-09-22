import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
//import SignUp from './pages/SignUp';
import AppProviders from './hooks';

const App: React.FC = () => (
  <>
    <AppProviders>
      <SignIn />
    </AppProviders>
    <GlobalStyle />
  </>
);

export default App;
