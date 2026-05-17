import { createContext, useContext, useState, useCallback } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = useCallback((recipe) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === recipe.id);
      if (exists) {
        return prev.filter((f) => f.id !== recipe.id);
      }
      return [...prev, recipe];
    });
  }, []);

  const removeFavorite = useCallback((recipeId) => {
    setFavorites((prev) => prev.filter((f) => f.id !== recipeId));
  }, []);

  const isFavorite = useCallback(
    (recipeId) => {
      return favorites.some((f) => f.id === recipeId);
    },
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
