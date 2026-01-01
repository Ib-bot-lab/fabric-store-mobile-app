import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RecipeForm from "../../components/forms/RecipeForm";
import { useRecipes } from "../../context/RecipesContext";

export default function PersonalCookbookScreen({ navigation }) {
  const { userRecipes, deleteRecipe } = useRecipes();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cookbook</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("RecipeCreation")}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>

      {userRecipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="book-outline" size={80} color="#E0E0E0" />
          <Text style={styles.emptyTitle}>Your Cookbook is Empty</Text>
          <Text style={styles.emptyText}>
            Start creating your own recipes to build your personal cookbook!
          </Text>
          <TouchableOpacity
            style={styles.createFirstButton}
            onPress={() => navigation.navigate("RecipeCreation")}
          >
            <Text style={styles.createFirstButtonText}>
              Create Your First Recipe
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.recipesCount}>
            {userRecipes.length}
            {userRecipes.length === 1 ? "recipe" : "recipes"} in your cookbook
          </Text>

          {userRecipes.map((recipe) => (
            <View key={recipe.$id} style={styles.recipeCard}>
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
              />
              <View style={styles.recipeInfo}>
                <View style={styles.recipeHeader}>
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  <View style={styles.recipeActions}>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteRecipe(recipe.$id)}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={16}
                        color="#FF6B6B"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.recipeMeta}>
                  <Text style={styles.recipeCategory}>{recipe.category}</Text>
                  <Text style={styles.cookTime}>{recipe.cookTime}</Text>
                </View>
                <Text style={styles.createdDate}>{recipe.desc}</Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() =>
                      navigation.navigate("RecipeCreation", { recipe })
                    }
                  >
                    <Ionicons name="create-outline" size={16} color="#666" />
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() =>
                      navigation.navigate("RecipeDetail", { recipe })
                    }
                  >
                    <Ionicons name="eye-outline" size={16} color="white" />
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  createButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 6,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  recipesCount: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
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
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  recipeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  recipeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  recipeActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  privacyButton: {
    padding: 6,
    marginRight: 8,
  },
  deleteButton: {
    padding: 6,
  },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  recipeCategory: {
    fontSize: 14,
    color: "#FF6B6B",
    fontWeight: "500",
    marginRight: 12,
  },
  cookTime: {
    fontSize: 14,
    color: "#666",
  },
  createdDate: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: "row",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  editButtonText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
    fontWeight: "500",
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4ECDC4",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewButtonText: {
    fontSize: 12,
    color: "white",
    marginLeft: 4,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },
  createFirstButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  createFirstButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  titleInput: {
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: "#F0F0F0",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
  },
  createModalButton: {
    backgroundColor: "#FF6B6B",
  },
  createModalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
