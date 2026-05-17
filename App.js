import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </FavoritesProvider>
    </AuthProvider>
  );
}
