import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RecipeForm from "../../components/forms/RecipeForm";
import ImagePicker from "../../components/forms/ImagePicker";
import { BUCKET_ID, ID, storage } from "../../backend/appwriteConfig";
import { useRecipes } from "../../context/RecipesContext";
import * as FileSystem from "expo-file-system";
import { useAuth } from "../../context/AuthContext";

export default function RecipeCreationScreen({ navigation, route }) {
  const [recipeImage, setRecipeImage] = useState(null);
  const { createRecipe, updateRecipe } = useRecipes();
  const existingRecipe = route.params?.recipe;
  const { user, setUser } = useAuth();

  const parsedRecipe = existingRecipe
    ? {
        ...existingRecipe,
        ingredients: Array.isArray(existingRecipe.ingredients)
          ? existingRecipe.ingredients
          : JSON.parse(existingRecipe.ingredients || "[]"),
        instructions: Array.isArray(existingRecipe.instructions)
          ? existingRecipe.instructions
          : JSON.parse(existingRecipe.instructions || "[]"),
      }
    : null;

  const handleImageSelected = (imageUri) => {
    setRecipeImage(imageUri);
  };

  const handleImageRemoved = () => {
    setRecipeImage(null);
  };

  const uriToFile = async (uri) => {
    console.log("4242");

    const fileInfo = await FileSystem.getInfoAsync(uri, { size: true });
    const fileBlob = await (await fetch(uri)).blob();
    return fileBlob;
  };

  const uploadImageToCloudinary = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const mimeType = blob._data?.type || "image/jpeg";

      let formData = new FormData();
      formData.append("file", {
        uri,
        type: mimeType,
        name: `recipe_${Date.now()}.jpg`,
      });

      formData.append("upload_preset", "clerance");
      // replace with your Cloudinary preset

      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dxspjixju/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await uploadRes.json();

      if (result.secure_url) return result.secure_url;

      throw new Error("Failed to upload image");
    } catch (err) {
      console.log("Cloudinary upload error:", err);
      throw err;
    }
  };

  const handleSubmit = async (formData) => {
    try {
      console.log("start uploding");

      // Combine form data with image
      // 1️⃣ Upload image if selected
      let imageUrl = existingRecipe?.image || "https://via.placeholder.com/300";

      // Upload to Cloudinary instead of Appwrite
      if (recipeImage && !recipeImage.startsWith("http")) {
        imageUrl = await uploadImageToCloudinary(recipeImage);
      }

      console.log(imageUrl);

      // 2️⃣ Prepare recipe data
      const recipeData = {
        ...formData,
        ingredients: JSON.stringify(formData.ingredients),
        instructions: JSON.stringify(formData.instructions),
        image: imageUrl,
        likecount: existingRecipe?.likecount || 0,
        userId: user.$id,
      };

      // 3️⃣ Save or update
      if (existingRecipe) {
        await updateRecipe(existingRecipe.$id, recipeData);
        Alert.alert("Success", "Recipe updated successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } else {
        await createRecipe(recipeData);
        Alert.alert("Success", "Recipe created successfully!", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      console.log("Error saving recipe:", err);
      Alert.alert("Error", "Failed to save recipe. Please try again.");
    }
  };

  const handleCancel = () => {
    Alert.alert(
      "Discard Changes",
      "Are you sure you want to discard your changes?",
      [
        { text: "Keep Editing", style: "cancel" },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {existingRecipe ? "Edit Recipe" : "Create Recipe"}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Picker Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipe Image</Text>
          <Text style={styles.sectionSubtitle}>
            Add a beautiful photo of your finished dish
          </Text>
          <View style={styles.imagePickerContainer}>
            <ImagePicker
              image={recipeImage || parsedRecipe?.image}
              onImageSelected={handleImageSelected}
              onImageRemoved={handleImageRemoved}
              placeholder="Add Recipe Photo"
              size={200}
            />
          </View>
        </View>

        {/* Recipe Form */}
        <RecipeForm
          recipe={parsedRecipe}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
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
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  imagePickerContainer: {
    alignItems: "center",
  },
});
