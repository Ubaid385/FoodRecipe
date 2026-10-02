import { useContext, useState } from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

import { RecipeContext } from "../context/RecipeContext";
import { categories } from "../data/recipes";

import CategoryBar from "../components/CategoryBar";
import RecipeCard from "../components/RecipeCard";

const HomeScreen = ({ navigation }) => {
  const { recipes } = useContext(RecipeContext);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter((recipe) => recipe.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foodie 🍴</Text>

      <Text style={styles.subtitle}>Discover delicious recipes</Text>

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
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
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#777",
    marginBottom: 20,
    marginTop: 5,
  },
});
