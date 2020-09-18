import React, { createContext, useCallback } from 'react';

interface AuthContextState {
  name: string;
  signIn(): void;
}

export const AuthContext = createContext<AuthContextState>(
  {} as AuthContextState,
);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(() => {
    console.log('signIn');
  }, []);
  return (
    <AuthContext.Provider value={{ name: 'Filipe', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
