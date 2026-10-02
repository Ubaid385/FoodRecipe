import { useContext } from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

import RecipeCard from "../components/RecipeCard";
import { RecipeContext } from "../context/RecipeContext";

const FavoritesScreen = ({ navigation }) => {
  const { recipes, favorites } = useContext(RecipeContext);

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Favorites</Text>

      {favoriteRecipes.length === 0 ? (
        <Text style={styles.empty}>You have no favorite recipes yet.</Text>
      ) : (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() =>
                navigation.navigate("RecipeDetails", {
                  recipeId: item.id,
                })
              }
            />
          )}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#777",
    fontSize: 16,
  },
});
