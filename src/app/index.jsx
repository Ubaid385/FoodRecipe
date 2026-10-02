import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RecipeProvider } from "../context/RecipeContext";

import AddRecipeScreen from "../screens/AddRecipeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";
import MyFoodScreen from "../screens/MyFoodScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => "🏠",
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: () => "❤️",
        }}
      />

      <Tab.Screen
        name="MyFood"
        component={MyFoodScreen}
        options={{
          tabBarLabel: "My Food",
          tabBarIcon: () => "🍳",
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <RecipeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="MainTabs" component={MainTabs} />

          <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />

          <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecipeProvider>
  );
};

export default App;
