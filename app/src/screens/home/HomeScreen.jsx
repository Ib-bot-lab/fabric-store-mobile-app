import React from "react";
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
import second from "../../../../assets/iconn.jpeg";

export default function HomeScreen({ navigation }) {
  const featuredRecipes = [
    {
      id: 1,
      title: "Chocolate Cake",
      image: "https://via.placeholder.com/150",
      rating: 95,
      cookTime: "45 min",
    },
    {
      id: 2,
      title: "Pasta Carbonara",
      image: "https://via.placeholder.com/150",
      rating: 92,
      cookTime: "30 min",
    },
    {
      id: 3,
      title: "Fresh Salad",
      image: "https://via.placeholder.com/150",
      rating: 88,
      cookTime: "15 min",
    },
  ];

  const categories = [
    { name: "Native", icon: "🍰", count: 45 },
    { name: "swellow", icon: "🍰", count: 45 },
    { name: "Cakes", icon: "🍰", count: 45 },
    { name: "Pasta", icon: "🍝", count: 32 },
    { name: "Drinks", icon: "🥤", count: 28 },
    { name: "Starters", icon: "🥗", count: 23 },
    { name: "Pie", icon: "🥧", count: 19 },
    { name: "Noodles", icon: "🍜", count: 27 },
    { name: "Family Meal", icon: "👨‍👩‍👧‍👦", count: 38 },
    { name: "Salad", icon: "🥬", count: 31 },
  ];

  const { recipes, topRated, fetchRecipes } = useRecipes();

  const handleRefresh = () => {
    fetchRecipes();
  };

  return (
    <View style={styles.alco}>
      <TouchableOpacity
        style={styles.quickAction}
        onPress={() => navigation.navigate("RecipeCreation")}
      >
        <View style={[styles.quickIcon, { backgroundColor: "#96CEB4" }]}>
          <Ionicons name="add" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <View style={styles.header}>
        <Image
          source={require("../../../../assets/iconn.jpeg")}
          style={styles.recipeImagee}
        />
        <View>
          <Text style={styles.greeting}>Hello, Chef! 👋</Text>
          <Text style={styles.subtitle}>
            What would you like to cook today?
          </Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Ionicons name="person-circle" size={32} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchText}>Search recipes, ingredients...</Text>
        </TouchableOpacity>

        {/* Categories Section */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                onPress={() =>
                  navigation.navigate("CategorySearch", {
                    category: category.name,
                  })
                }
              >
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {topRated && topRated.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Now</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {topRated.map((recipe) => (
                <TouchableOpacity
                  key={recipe.$id}
                  style={styles.recipeCard}
                  onPress={() =>
                    navigation.navigate("RecipeDetail", { recipe })
                  }
                >
                  <Image
                    source={{ uri: recipe.image }}
                    style={styles.recipeImage}
                  />
                  <View style={styles.recipeInfo}>
                    <Text style={styles.recipeTitle}>{recipe.title}</Text>
                    <View style={styles.trendingMeta}>
                      <Ionicons name="flame" size={16} color="#FF6B6B" />
                      <Text style={styles.trendingText}>Trending</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        {/* Trending Now */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All</Text>
          </View>

          <View style={styles.trendingContainer}>
            {(!recipes.length || recipes.length === 0) && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No recipes found.</Text>
                <TouchableOpacity
                  style={styles.refreshButton}
                  onPress={handleRefresh}
                >
                  <Ionicons name="refresh" size={24} color="#fff" />
                  <Text style={styles.refreshButtonText}>Refresh</Text>
                </TouchableOpacity>
              </View>
            )}
            {recipes.map((recipe, index) => (
              <TouchableOpacity
                key={recipe.$id}
                style={styles.trendingCard}
                onPress={() => navigation.navigate("RecipeDetail", { recipe })}
              >
                <Image
                  source={{ uri: recipe.image }}
                  style={styles.trendingImage}
                />
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingTitle}>{recipe.title}</Text>
                  <View style={styles.trendingMeta}>
                    <View style={styles.recipeMeta}>
                      <Text style={styles.cookTime}>
                        Time to cook: {recipe.cookTime}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  alco: {
    flex: 1,
    gap: 0,
  },
  header: {
    paddingHorizontal: 20,
    backgroundColor: "#ffffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    padding: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchText: {
    marginLeft: 12,
    color: "#999",
    fontSize: 16,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  quickAction: {
    alignItems: "center",
    flex: 1,
    position: "absolute",
    bottom: 20,
    zIndex: 1000,
    right: 20,
  },
  quickIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
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
  seeAllText: {
    color: "#FF6B6B",
    fontSize: 14,
    fontWeight: "500",
  },
  categoriesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryCard: {
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 7,
    alignItems: "center",
    marginRight: 12,
    minWidth: 80,
    borderWidth: 1,
    borderColor: "#d5d5d5ff",
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: "#999",
  },
  recipeCard: {
    backgroundColor: "#ffffffff",
    borderRadius: 12,
    marginRight: 15,
    width: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 3,
  },
  recipeImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    // borderWidth: 1,
    // borderColor: "#ddd",
  },
  recipeInfo: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  recipeMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
  cookTime: {
    fontSize: 12,
    color: "#666",
  },
  trendingContainer: {
    marginHorizontal: -5,
  },
  trendingCard: {
    backgroundColor: "white",
    borderRadius: 12,
    // padding: 12,
    marginHorizontal: 5,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  trendingImage: {
    width: 70,
    height: 70,
    // borderRadius: 8,
  },
  trendingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  trendingMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  trendingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#FF6B6B",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  recipeImagee: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
