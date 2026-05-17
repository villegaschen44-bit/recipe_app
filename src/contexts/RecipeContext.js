import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import initialRecipes from '../data/recipes';

const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(initialRecipes);

  const categories = useMemo(() => {
    return ['All', ...new Set(recipes.map((recipe) => recipe.category))];
  }, [recipes]);

  const addRecipe = useCallback((recipeData) => {
    const newRecipe = {
      id: Date.now().toString(),
      ...recipeData,
    };

    setRecipes((prevRecipes) => [newRecipe, ...prevRecipes]);
    return newRecipe;
  }, []);

  const deleteRecipe = useCallback((recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeId),
    );
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes, categories, addRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}
