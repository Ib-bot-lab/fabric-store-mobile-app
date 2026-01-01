export const categories = [
  { id: 1, name: "Cakes", icon: "🍰", count: 45 },
  { id: 2, name: "Pasta", icon: "🍝", count: 32 },
  { id: 3, name: "Drinks", icon: "🥤", count: 28 },
  { id: 4, name: "Starters", icon: "🥗", count: 23 },
  { id: 5, name: "Pie", icon: "🥧", count: 19 },
  { id: 6, name: "Noodles", icon: "🍜", count: 27 },
  { id: 7, name: "Family Meal", icon: "👨‍👩‍👧‍👦", count: 38 },
  { id: 8, name: "Salad", icon: "🥬", count: 31 },
];

export const ingredients = [
  { id: 1, name: "Potato", icon: "🥔" },
  { id: 2, name: "Tomato", icon: "🍅" },
  { id: 3, name: "Mushroom", icon: "🍄" },
  { id: 4, name: "Broccoli", icon: "🥦" },
  { id: 5, name: "Eggplant", icon: "🍆" },
  { id: 6, name: "Chicken", icon: "🍗" },
  { id: 7, name: "Beef", icon: "🥩" },
  { id: 8, name: "Fish", icon: "🐟" },
];

export const featuredRecipes = [
  {
    id: 1,
    title: "Chocolate Cake",
    image: "https://via.placeholder.com/300",
    rating: 95,
    cookTime: "45 min",
    category: "Cakes",
    isFavorite: true,
    ingredients: ["Flour", "Sugar", "Cocoa", "Eggs", "Milk", "Butter"],
    instructions: [
      "Preheat oven to 350°F (175°C).",
      "Mix dry ingredients in a bowl.",
      "Add wet ingredients and mix well.",
      "Pour into pan and bake for 30-35 minutes.",
      "Cool completely before serving.",
    ],
  },
  {
    id: 2,
    title: "Spaghetti Carbonara",
    image: "https://via.placeholder.com/300",
    rating: 94,
    cookTime: "25 min",
    category: "Pasta",
    isFavorite: false,
    ingredients: ["Spaghetti", "Eggs", "Parmesan", "Bacon", "Black Pepper"],
    instructions: [
      "Cook spaghetti according to package directions.",
      "Fry bacon until crispy.",
      "Mix eggs and cheese in a bowl.",
      "Combine everything while pasta is hot.",
      "Season with black pepper and serve.",
    ],
  },
  {
    id: 3,
    title: "Fresh Orange Juice",
    image: "https://via.placeholder.com/300",
    rating: 87,
    cookTime: "5 min",
    category: "Drinks",
    isFavorite: true,
    ingredients: ["Oranges"],
    instructions: [
      "Wash oranges thoroughly.",
      "Cut oranges in half.",
      "Juice using a citrus juicer.",
      "Strain if desired and serve chilled.",
    ],
  },
];

export const trendingRecipes = [
  {
    id: 4,
    title: "Avocado Toast",
    image: "https://via.placeholder.com/300",
    rating: 89,
    cookTime: "10 min",
    category: "Breakfast",
    trendScore: 95,
  },
  {
    id: 5,
    title: "Vegetable Stir Fry",
    image: "https://via.placeholder.com/300",
    rating: 91,
    cookTime: "20 min",
    category: "Main Course",
    trendScore: 92,
  },
  {
    id: 6,
    title: "Berry Smoothie",
    image: "https://via.placeholder.com/300",
    rating: 88,
    cookTime: "5 min",
    category: "Drinks",
    trendScore: 89,
  },
];
