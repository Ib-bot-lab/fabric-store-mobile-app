import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AuthNavigator from "./AuthNavigator";
import HomeScreen from "../screens/home/HomeScreen";
import SearchScreen from "../screens/search/SearchScreen";
import FavoritesScreen from "../screens/recipes/FavoritesScreen";
import PersonalCookbookScreen from "../screens/recipes/PersonalCookbookScreen";
import RecipeDetailScreen from "../screens/recipes/RecipeDetailScreen";
import CategorySearchScreen from "../screens/search/CategorySearchScreen";
import IngredientSearchScreen from "../screens/search/IngredientSearchScreen";
import RecipeListScreen from "../screens/recipes/RecipeListScreen";
import SocialShareScreen from "../screens/social/SocialShareScreen";
import RecipeForm from "../components/forms/RecipeForm";
import RecipeCreationScreen from "../screens/recipes/RecipeCreationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useAuth } from "../context/AuthContext";
import { Text } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Cookbook") {
            iconName = focused ? "book" : "book-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cookbook" component={PersonalCookbookScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <Text>loading</Text>;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={HomeTabs}
            screenOptions={{ headerShown: false }}
          />
          <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
          <Stack.Screen
            name="CategorySearch"
            component={CategorySearchScreen}
          />
          <Stack.Screen
            name="IngredientSearch"
            component={IngredientSearchScreen}
          />
          <Stack.Screen name="RecipeList" component={RecipeListScreen} />
          <Stack.Screen name="SocialShare" component={SocialShareScreen} />
          <Stack.Screen name="RecipeForm" component={RecipeForm} />
          <Stack.Screen
            name="RecipeCreation"
            component={RecipeCreationScreen}
          />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
