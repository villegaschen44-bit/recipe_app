import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { RecipeProvider } from './src/contexts/RecipeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <FavoritesProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </FavoritesProvider>
      </RecipeProvider>
    </AuthProvider>
  );
}
