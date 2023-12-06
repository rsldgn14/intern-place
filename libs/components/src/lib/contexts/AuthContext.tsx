import { AuthService } from '@intern-place/services';
import { Auth, Callback, Users } from '@intern-place/types';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<Auth.AuthContextProps>({
  user: undefined,
  isAuthenticated: false,
  setUser: Callback.emptyCallback,
  setAuthenticated: Callback.emptyCallback,
  loading: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const [user, setUser] = useState<Users.User>();
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.checkLogin(setAuthenticated, setUser, setLoading);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setAuthenticated,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
