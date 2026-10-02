import { useContext } from "react";

import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import RecipeCard from "../components/RecipeCard";
import { RecipeContext } from "../context/RecipeContext";

const MyFoodScreen = ({ navigation }) => {
  const { recipes, deleteRecipe } = useContext(RecipeContext);

  const myRecipes = recipes.filter((recipe) => recipe.isUserRecipe);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍳 My Food</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddRecipe")}
      >
        <Text style={styles.addText}>+ Add New Recipe</Text>
      </TouchableOpacity>

      {myRecipes.length === 0 ? (
        <Text style={styles.empty}>You haven't added any recipes yet.</Text>
      ) : (
        <FlatList
          data={myRecipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <RecipeCard
                recipe={item}
                onPress={() =>
                  navigation.navigate("RecipeDetails", {
                    recipeId: item.id,
                  })
                }
              />

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    navigation.navigate("AddRecipe", {
                      recipe: item,
                    })
                  }
                >
                  <Text>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteRecipe(item.id)}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MyFoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },

  addButton: {
    backgroundColor: "#ff7043",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  addText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#777",
  },

  actions: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },

  editButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#ddd",
    alignItems: "center",
    borderRadius: 8,
  },

  deleteButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#ffcccc",
    alignItems: "center",
    borderRadius: 8,
  },
});
