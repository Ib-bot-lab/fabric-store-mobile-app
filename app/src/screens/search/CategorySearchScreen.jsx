import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRecipes } from "../../context/RecipesContext";

export default function CategorySearchScreen({ navigation, route }) {
  const [selectedCategory, setSelectedCategory] = useState(
    route.params?.category || "All"
  );
  const { recipes, topRated, createRecipe, updateRecipe, deleteRecipe } =
    useRecipes();

  const categories = [
    { name: "All", icon: "🍽️", count: 256 },
    { name: "swellow", icon: "👨‍👩‍👧‍👦", count: 45 },
    { name: "Native", icon: "👨‍👩‍👧‍👦", count: 45 },
    { name: "Cakes", icon: "🍰", count: 45 },
    { name: "Pasta", icon: "🍝", count: 32 },
    { name: "Drinks", icon: "🥤", count: 28 },
    { name: "Starters", icon: "🥗", count: 23 },
    { name: "Pie", icon: "🥧", count: 19 },
    { name: "Noodles", icon: "🍜", count: 27 },
    { name: "Family Meal", icon: "👨‍👩‍👧‍👦", count: 38 },
    { name: "Salad", icon: "🥬", count: 31 },
  ];

  const categoryRecipes = {
    Cakes: [
      {
        id: 1,
        title: "Chocolate Cake",
        image: "https://via.placeholder.com/150",
        rating: 95,
        cookTime: "45 min",
      },
      {
        id: 2,
        title: "Vanilla Cupcakes",
        image: "https://via.placeholder.com/150",
        rating: 88,
        cookTime: "30 min",
      },
      {
        id: 3,
        title: "Red Velvet Cake",
        image: "https://via.placeholder.com/150",
        rating: 92,
        cookTime: "50 min",
      },
    ],
    Pasta: [
      {
        id: 4,
        title: "Spaghetti Carbonara",
        image: "https://via.placeholder.com/150",
        rating: 94,
        cookTime: "25 min",
      },
      {
        id: 5,
        title: "Fettuccine Alfredo",
        image: "https://via.placeholder.com/150",
        rating: 89,
        cookTime: "20 min",
      },
    ],
    All: [
      {
        id: 1,
        title: "Chocolate Cake",
        image: "https://via.placeholder.com/150",
        rating: 95,
        cookTime: "45 min",
      },
      {
        id: 4,
        title: "Spaghetti Carbonara",
        image: "https://via.placeholder.com/150",
        rating: 94,
        cookTime: "25 min",
      },
      {
        id: 6,
        title: "Fresh Orange Juice",
        image: "https://via.placeholder.com/150",
        rating: 87,
        cookTime: "5 min",
      },
    ],
  };

  const filteredRecipes =
    selectedCategory === "All"
      ? recipes
      : recipes.filter(
          (recipe) =>
            recipe.category &&
            recipe.category.trim().toLowerCase() ===
              selectedCategory.trim().toLowerCase()
        );

  console.log("dddd", filteredRecipes);

  // const recipes = categoryRecipes[selectedCategory] || categoryRecipes["All"];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories Grid */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.name &&
                    styles.categoryItemSelected,
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.recipeCount}>{category.count} recipes</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}

        {/* Recipes List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === "All" ? "All Recipes" : selectedCategory}
            </Text>
            <Text style={styles.recipeCountHeader}>
              {recipes.length} recipes
            </Text>
          </View>

          {filteredRecipes.map((recipe) => (
            <TouchableOpacity
              key={recipe.$id}
              style={styles.recipeCard}
              onPress={() => navigation.navigate("RecipeDetail", { recipe })}
            >
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
              />
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <View style={styles.recipeMeta}>
                  <View style={styles.rating}>
                    <Ionicons name="heart" size={16} color="#ff0000ff" />
                    <Text style={styles.ratingText}>{recipe.likecount}</Text>
                  </View>
                  <View style={styles.cookTime}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.cookTimeText}>{recipe.cookTime}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  placeholder: {
    width: 24,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  recipeCountHeader: {
    fontSize: 14,
    color: "#666",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    width: "45%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryItemSelected: {
    backgroundColor: "#FF6B6B",
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  categoryItemSelected: {
    backgroundColor: "#FF6B6B",
  },
  categoryItemSelected: {
    backgroundColor: "#FF6B6B",
  },
  categoryItemSelected: {
    backgroundColor: "#FF6B6B",
  },
  recipeCount: {
    fontSize: 12,
    color: "#666",
  },
  recipeCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  recipeImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  recipeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  cookTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  cookTimeText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  favoriteButton: {
    padding: 8,
  },
});
