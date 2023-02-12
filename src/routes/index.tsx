import React from 'react';
import { View, ActivityIndicator } from 'react-native';


import { useAuth } from '../hooks/auth';
import theme from '../global/styles/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../screens/SignIn';
import { Home } from '../screens/Home';

const App = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <App.Screen name="SignIn" component={SignIn} />
    </App.Navigator>
  )
}

function AppRoutes() {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <App.Screen name="Home" component={Home} />
    </App.Navigator>
  )
}

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  return user.id ? <AppRoutes /> : < AuthRoutes />
};

export default Routes;