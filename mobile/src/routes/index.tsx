import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  // Verifica se esta em processo de carregamento, estiver mostra o activity indicator
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  // verifica se o usuario esta autenticado, se estiver ele vai para
  // o Approutes se nao para o authroutes
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
