import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeForm({ recipe = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: recipe?.title || "",
    desc: recipe?.desc || "",
    prepTime: recipe?.prepTime || "",
    cookTime: recipe?.cookTime || "",
    // totalTime: recipe?.totalTime || "",
    servings: recipe?.servings || "4",
    difficulty: recipe?.difficulty || "Medium",
    category: recipe?.category || "",
    ingredients: recipe?.ingredients || [""],
    instructions: recipe?.instructions || [""],
  });

  console.log("dsdsd", formData);

  const [newIngredient, setNewIngredient] = useState("");
  const [newInstruction, setNewInstruction] = useState("");
  const [newTag, setNewTag] = useState("");

  const categories = [
    "Native",
    "swellow",
    "Cakes",
    "Pasta",
    "Drinks",
    "Starters",
    "Pie",
    "Noodles",
    "Family Meal",
    "Salad",
    "Dessert",
    "Main Course",
    "Appetizer",
    "Breakfast",
  ];

  const difficulties = ["Easy", "Medium", "Hard"];

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()],
      }));
      setNewIngredient("");
    }
  };

  const removeIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      setFormData((prev) => ({
        ...prev,
        instructions: [...prev.instructions, newInstruction.trim()],
      }));
      setNewInstruction("");
    }
  };

  const removeInstruction = (index) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      Alert.alert("Error", "Please enter a recipe title");
      return;
    }

    if (formData.ingredients.length === 0) {
      Alert.alert("Error", "Please add at least one ingredient");
      return;
    }

    if (formData.instructions.length === 0) {
      Alert.alert("Error", "Please add at least one instruction");
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Basic Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Recipe Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter recipe title"
            value={formData.title}
            onChangeText={(value) => updateField("title", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your recipe"
            value={formData.desc}
            onChangeText={(value) => updateField("desc", value)}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Prep Time</Text>
            <TextInput
              style={styles.input}
              placeholder="15 min"
              value={formData.prepTime}
              onChangeText={(value) => updateField("prepTime", value)}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Cook Time</Text>
            <TextInput
              style={styles.input}
              placeholder="30 min"
              value={formData.cookTime}
              onChangeText={(value) => updateField("cookTime", value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Servings</Text>
            <TextInput
              style={styles.input}
              placeholder="4"
              value={formData.servings}
              onChangeText={(value) => updateField("servings", value)}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Difficulty</Text>
            <View style={styles.difficultyButtons}>
              {difficulties.map((difficulty) => (
                <TouchableOpacity
                  key={difficulty}
                  style={[
                    styles.difficultyButton,
                    formData.difficulty === difficulty &&
                      styles.difficultyButtonSelected,
                  ]}
                  onPress={() => updateField("difficulty", difficulty)}
                >
                  <Text
                    style={[
                      styles.difficultyButtonText,
                      formData.difficulty === difficulty &&
                        styles.difficultyButtonTextSelected,
                    ]}
                  >
                    {difficulty}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    formData.category === category &&
                      styles.categoryButtonSelected,
                  ]}
                  onPress={() => updateField("category", category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      formData.category === category &&
                        styles.categoryButtonTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      {/* Ingredients */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients *</Text>

        {formData.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listBullet}>•</Text>
            <Text style={styles.listText}>{ingredient}</Text>
            <TouchableOpacity
              style={styles.removeItemButton}
              onPress={() => removeIngredient(index)}
            >
              <Ionicons name="close-circle" size={20} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.addItemContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Add ingredient"
            value={newIngredient}
            onChangeText={setNewIngredient}
            onSubmitEditing={addIngredient}
          />
          <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions *</Text>

        {formData.instructions.map((instruction, index) => (
          <View key={index} style={styles.instructionItem}>
            <View style={styles.instructionNumber}>
              <Text style={styles.instructionNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.instructionText}>{instruction}</Text>
            <TouchableOpacity
              style={styles.removeItemButton}
              onPress={() => removeInstruction(index)}
            >
              <Ionicons name="close-circle" size={20} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.addItemContainer}>
          <TextInput
            style={[styles.input, styles.textArea, { flex: 1, marginRight: 8 }]}
            placeholder="Add instruction step"
            value={newInstruction}
            onChangeText={setNewInstruction}
            multiline
            numberOfLines={2}
          />
          <TouchableOpacity style={styles.addButton} onPress={addInstruction}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tags */}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {recipe ? "Update Recipe" : "Create Recipe"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
  },
  difficultyButtons: {
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    padding: 4,
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  difficultyButtonSelected: {
    backgroundColor: "#FF6B6B",
  },
  difficultyButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  difficultyButtonTextSelected: {
    color: "white",
  },
  categoriesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
  },
  categoryButton: {
    backgroundColor: "#F7F7F7",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryButtonSelected: {
    backgroundColor: "#FF6B6B",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  categoryButtonTextSelected: {
    color: "white",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  listBullet: {
    fontSize: 16,
    color: "#FF6B6B",
    marginRight: 8,
    marginTop: 2,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  instructionNumberText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  removeItemButton: {
    padding: 4,
    marginLeft: 8,
  },
  addItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#1976D2",
    marginRight: 6,
    fontWeight: "500",
  },
  privacyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  privacyDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: "row",
    marginBottom: 30,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginRight: 12,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    flex: 2,
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
