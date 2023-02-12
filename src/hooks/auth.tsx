import React, { createContext, useCallback, useState, useContext, useEffect, useMemo, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { Alert } from 'react-native';


interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: Date;
  profile: string;
  created_at: Date;
  updated_at: Date;
  board_unit: {
    board_id: string;
    unit_id: string;
  }
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn({ email, password }: SignInCredentials): Promise<void>;
  signOut(): void;
}

type AuthContextProviderProps = {
  children: React.ReactElement;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {

      const user = await AsyncStorage.getItem('@SisVendas:user');
      const access_token = await AsyncStorage.getItem('@SisVendas:access_token');

      if (user && access_token) {
        setUser(JSON.parse(user))
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      } else (
        signOut()
      )
      setLoading(false);
    }

    loadStorageData();

  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    setLoading(true);

    api.post('/auth/login', {
      email,
      password
    }).then(async (resp) => {

      const { access_token } = resp.data;
      await AsyncStorage.setItem('@SisVendas:access_token', access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      api.get("/auth/me").then(async (res) => {
        setUser(res.data)
        await AsyncStorage.setItem('@SisVendas:user', JSON.stringify(res.data));
      })


      setLoading(false);
    }).catch(e => {
      Alert.alert("Ops!", "Erro ao tentar fazer login" + e);
    }).finally(() => {
      setLoading(false);
    })

  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@SisVendas:user', '@SisVendas:access_token']);

    setUser({} as User);
  }, []);



  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};//useAuth

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };