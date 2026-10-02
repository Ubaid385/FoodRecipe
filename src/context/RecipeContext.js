import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { recipesData } from "../data/recipes";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(recipesData);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedRecipes = await AsyncStorage.getItem("recipes");
      const savedFavorites = await AsyncStorage.getItem("favorites");

      if (savedRecipes) {
        setRecipes(JSON.parse(savedRecipes));
      }

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveRecipes = async (data) => {
    setRecipes(data);

    await AsyncStorage.setItem("recipes", JSON.stringify(data));
  };

  const toggleFavorite = async (id) => {
    let updatedFavorites;

    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favoriteId) => favoriteId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }

    setFavorites(updatedFavorites);

    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const addRecipe = async (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
      isUserRecipe: true,
    };

    const updatedRecipes = [...recipes, newRecipe];

    await saveRecipes(updatedRecipes);
  };

  const updateRecipe = async (id, updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe,
    );

    await saveRecipes(updatedRecipes);
  };

  const deleteRecipe = async (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);

    await saveRecipes(updatedRecipes);

    const updatedFavorites = favorites.filter(
      (favoriteId) => favoriteId !== id,
    );

    setFavorites(updatedFavorites);

    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favorites,
        toggleFavorite,
        addRecipe,
        updateRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
