import React, { createContext, useState, useEffect, useContext } from "react";
import {
  databases,
  ID,
  DATABASE_ID,
  RECIPES_COLLECTION_ID,
  FAVORITES_COLLECTION_ID,
} from "../backend/appwriteConfig";
import { Query } from "appwrite";
import { useAuth } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [topRated, setTopRated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRecipes, setUserRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]); // ⭐ FAVORITES
  const [favoriteRecipes, setFavoriteRecipes] = useState([]); // ⭐ Full recipe data
  const { user, setUser } = useAuth();

  // -----------------------------------------------------
  // 🔥 Fetch all favorites for current user
  // -----------------------------------------------------
  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        [Query.equal("userId", user.$id)]
      );

      setFavorites(res.documents);

      // Map recipeIds to full recipe objects
      const recipeIds = res.documents.map((f) => f.recipeId);

      const favRecipes = recipes.filter((r) => recipeIds.includes(r.$id));

      setFavoriteRecipes(favRecipes);
    } catch (err) {
      console.log("Error fetching favorites:", err);
    }
  };

  // -----------------------------------------------------
  // 🔥 Add a recipe to favorites
  // -----------------------------------------------------
  const addFavorite = async (recipeId) => {
    if (!user) return;

    try {
      const newFav = await databases.createDocument(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        ID.unique(),
        {
          userId: user.$id,
          recipeId: recipeId,
        }
      );

      setFavorites((prev) => [...prev, newFav]);

      // update favoriteRecipes list
      const recipe = recipes.find((r) => r.$id === recipeId);
      if (recipe) {
        setFavoriteRecipes((prev) => [...prev, recipe]);
      }
    } catch (err) {
      console.log("Error adding favorite:", err);
    }
  };

  // -----------------------------------------------------
  // 🔥 Remove from favorites
  // -----------------------------------------------------
  const removeFavorite = async (recipeId) => {
    try {
      // locate favorite entry
      const existingFav = favorites.find((f) => f.recipeId === recipeId);
      if (!existingFav) return;

      await databases.deleteDocument(
        DATABASE_ID,
        FAVORITES_COLLECTION_ID,
        existingFav.$id
      );

      // update local lists
      setFavorites((prev) => prev.filter((f) => f.recipeId !== recipeId));
      setFavoriteRecipes((prev) => prev.filter((r) => r.$id !== recipeId));
    } catch (err) {
      console.log("Error removing favorite:", err);
    }
  };

  // -----------------------------------------------------
  // 🔥 Remove from favorites
  // -----------------------------------------------------

  // Fetch favorites whenever user or recipes changes
  useEffect(() => {
    if (user && recipes.length > 0) {
      fetchFavorites();
    }
  }, [user, recipes]);
  // -----------------------------------------------------
  // 🔥 Remove from favorites
  // -----------------------------------------------------
  const computeUserRecipes = (list) => {
    if (!list || !user) return [];
    return list.filter((recipe) => recipe.userId === user.$id);
  };

  // -----------------------------------------------------
  // 🔥 Fetch all recipes
  // -----------------------------------------------------
  const fetchRecipes = async () => {
    console.log("start fatching resepy");

    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        RECIPES_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );

      const list = res.documents;

      setRecipes(list);

      // compute top rated
      calculateTopRated(list);

      // compute user recipes
      setUserRecipes(computeUserRecipes(list));

      return list;
    } catch (err) {
      console.log("Error fetching recipes:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recipes) {
      setUserRecipes(computeUserRecipes(recipes));

      calculateTopRated(recipes);
    }
  }, [recipes]);

  // -----------------------------------------------------
  // 🔥 Compute top rated recipe
  // -----------------------------------------------------
  const calculateTopRated = (list) => {
    if (!list || list.length === 0) {
      setTopRated([]);
      return;
    }

    // Filter items with likecount > 20 and sort descending
    const topRatedArray = list
      .filter((item) => Number(item.likecount) > 10)
      .sort((a, b) => Number(b.likecount) - Number(a.likecount));

    setTopRated(topRatedArray);
  };

  // -----------------------------------------------------
  // 🔥 Create a new recipe
  // -----------------------------------------------------
  const createRecipe = async (data) => {
    try {
      let imageUrl = null;

      // 🔥 UPLOAD IMAGE TO APPWRITE STORAGE
      if (data.imageFile) {
        const uploaded = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          data.imageFile
        );

        // Generate Appwrite URL
        imageUrl = storage.getFileView(BUCKET_ID, uploaded.$id);
        console.log(imageUrl);
      }

      const recipeData = {
        ...data,
        image: imageUrl, // 🔥 save URL to database
      };

      delete recipeData.imageFile; // cleanup before saving to DB

      const newRecipe = await databases.createDocument(
        DATABASE_ID,
        RECIPES_COLLECTION_ID,
        ID.unique(),
        data
      );

      const updatedList = [newRecipe, ...recipes];
      setRecipes(updatedList);
      calculateTopRated(updatedList);
      setUserRecipes(computeUserRecipes(updatedList));

      return newRecipe;
    } catch (err) {
      console.log("Error creating recipe:", err);
      throw err;
    }
  };

  // -----------------------------------------------------
  // 🔥 Update recipe
  // -----------------------------------------------------
  const updateRecipe = async (recipeId, updatedData) => {
    try {
      const updatedRecipe = await databases.updateDocument(
        DATABASE_ID,
        RECIPES_COLLECTION_ID,
        recipeId,
        updatedData
      );

      const updatedList = recipes.map((r) =>
        r.$id === recipeId ? updatedRecipe : r
      );

      setRecipes(updatedList);
      calculateTopRated(updatedList);
      setUserRecipes(computeUserRecipes(updatedList));

      return updatedRecipe;
    } catch (err) {
      console.log("Error updating recipe:", err);
      throw err;
    }
  };

  // -----------------------------------------------------
  // 🔥 Delete recipe
  // -----------------------------------------------------
  const deleteRecipe = async (recipeId) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        RECIPES_COLLECTION_ID,
        recipeId
      );

      const updatedList = recipes.filter((r) => r.$id !== recipeId);

      setRecipes(updatedList);
      calculateTopRated(updatedList);
      setUserRecipes(computeUserRecipes(updatedList));

      return true;
    } catch (err) {
      console.log("Error deleting recipe:", err);
      throw err;
    }
  };

  // -----------------------------------------------------
  // 🔥 Fetch on mount
  // -----------------------------------------------------
  const likeRecipe = async (recipeId) => {
    try {
      // check local storage
      const liked = await AsyncStorage.getItem(`liked_${recipeId}`);
      if (liked === "true") return; // already liked

      const recipe = recipes.find((r) => r.$id === recipeId);
      if (!recipe) return;

      // new like count
      const newLikeCount = Number(recipe.likecount || 0) + 1;

      // update recipe in Appwrite
      const updatedRecipe = await databases.updateDocument(
        DATABASE_ID,
        RECIPES_COLLECTION_ID,
        recipeId,
        { likecount: newLikeCount }
      );

      // update local list
      const updatedList = recipes.map((r) =>
        r.$id === recipeId ? updatedRecipe : r
      );

      setRecipes(updatedList);

      // store liked flag
      await AsyncStorage.setItem(`liked_${recipeId}`, "true");
    } catch (err) {
      console.log("Error liking recipe:", err);
    }
  };

  // -----------------------------------------------------
  // 🔥 Fetch on mount
  // -----------------------------------------------------
  useEffect(() => {
    fetchRecipes();
  }, []);

  console.log("dddddd", userRecipes);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        topRated,
        loading,
        fetchRecipes,
        createRecipe,
        updateRecipe,
        deleteRecipe,
        userRecipes,
        favorites, // ⭐ raw favorite list
        favoriteRecipes, // ⭐ full recipes user favorited
        fetchFavorites,
        addFavorite,
        removeFavorite,
        likeRecipe,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipesContext);
