/**
 * Enriches dish objects with culinary metadata:
 * ingredients, spiciness levels, allergen warnings, calorie count, and prep times.
 */

const INGREDIENTS_BY_KEYWORD = {
  pizza: [
    "Stone-ground artisan flour",
    "San Marzano tomato coulis",
    "Fior di latte fresh mozzarella",
    "Genovese organic basil",
    "Cold-pressed virgin olive oil",
  ],
  pasta: [
    "Handmade durum wheat tagliatelle",
    "Aged Parmigiano Reggiano (24 months)",
    "Pasture-raised egg yolks",
    "Smoked cured pancetta",
    "Cracked Tellicherry black pepper",
  ],
  steak: [
    "Dry-aged grain-fed prime beef cut",
    "Crushed roasted garlic cloves",
    "Fresh garden rosemary & thyme",
    "French salted compound butter",
    "Maldon smoked sea salt flakes",
  ],
  salmon: [
    "Fresh Atlantic wild-caught salmon",
    "Lemon-herb infused glaze",
    "Sautéed organic baby asparagus",
    "Dill butter emulsion",
    "Pink peppercorn garnish",
  ],
  chicken: [
    "Free-range chicken breast",
    "Meyer lemon zest marinade",
    "Charred sweet garlic bulb",
    "Fresh Mediterranean oregano",
    "Extra virgin olive oil reduction",
  ],
  burger: [
    "Brioche bun toasted with butter",
    "Double prime beef smash patty",
    "Melted aged sharp cheddar",
    "Caramelized shallot onion jam",
    "House secret relish aioli",
  ],
  salad: [
    "Crisp baby romaine & arugula",
    "Greek Kalamata pitted olives",
    "Crumbled Mediterranean feta cheese",
    "Heirloom cherry tomatoes",
    "Herbed white balsamic vinaigrette",
  ],
  soup: [
    "Slow-simmered aromatic vegetable broth",
    "Roasted vine-ripened plum tomatoes",
    "Light farm cream drizzle",
    "Crispy sourdough croutons",
    "Micro-herbs",
  ],
  cake: [
    "Single-origin Belgian dark cocoa 70%",
    "Madagascar Bourbon vanilla bean",
    "Whipped double farm cream",
    "Organic golden cane sugar",
    "Fresh raspberry coulis",
  ],
  coffee: [
    "Single-origin Ethiopian Yirgacheffe beans",
    "Slow double-filtered spring water",
    "Steamed organic whole milk froth",
    "Natural hazelnut syrup touch",
  ],
  tacos: [
    "Warm handmade masa corn tortillas",
    "Slow-braised spiced tender meat",
    "Fresh diced white onion & cilantro",
    "Charred salsa verde",
    "Fresh key lime wedges",
  ],
};

const DEFAULT_INGREDIENTS = [
  "Farm-fresh organic vegetables",
  "House secret seasoning blend",
  "Cold-pressed extra virgin olive oil",
  "Fresh garden culinary herbs",
  "Natural sea salt & cracked pepper",
];

export function getDishMetadata(dish = {}) {
  const name = (dish.menuItemName || dish.name || dish.recipesName || "").toLowerCase();
  const desc = (dish.menuItemDesc || dish.desc || dish.recipesSubTitle || "").toLowerCase();
  const cat = (dish.category || "").toLowerCase();

  // 1. Ingredients
  let ingredients = DEFAULT_INGREDIENTS;
  for (const [key, list] of Object.entries(INGREDIENTS_BY_KEYWORD)) {
    if (name.includes(key) || desc.includes(key) || cat.includes(key)) {
      ingredients = list;
      break;
    }
  }

  // 2. Spiciness level
  let spiciness = { level: 0, label: "Mild / Non-Spicy", icon: "🌱" };
  if (name.includes("spicy") || desc.includes("chili") || name.includes("taco") || name.includes("curry")) {
    spiciness = { level: 3, label: "Spicy Hot", icon: "🌶️🌶️🌶️" };
  } else if (name.includes("pepper") || desc.includes("pepper") || desc.includes("herb chicken") || name.includes("scampi")) {
    spiciness = { level: 2, label: "Medium Spice", icon: "🌶️🌶️" };
  } else if (name.includes("steak") || name.includes("stir fry") || name.includes("lemon")) {
    spiciness = { level: 1, label: "Gentle Zest", icon: "🌶️" };
  }

  // 3. Dietary & Allergens
  const allergens = [];
  if (name.includes("salmon") || name.includes("shrimp") || name.includes("fish") || name.includes("seafood") || name.includes("scampi")) {
    allergens.push({ name: "Contains Shellfish/Fish", type: "warning", icon: "🦐" });
  }
  if (name.includes("pizza") || name.includes("pasta") || name.includes("toast") || name.includes("waffle") || name.includes("pancake") || name.includes("bagel") || name.includes("burger")) {
    allergens.push({ name: "Contains Gluten", type: "warning", icon: "🌾" });
  } else {
    allergens.push({ name: "Gluten-Friendly", type: "success", icon: "✅" });
  }

  if (name.includes("pizza") || name.includes("carbonara") || name.includes("cheese") || name.includes("cream") || name.includes("cake") || name.includes("omelette")) {
    allergens.push({ name: "Contains Dairy", type: "info", icon: "🥛" });
  }

  if (name.includes("salad") || name.includes("vegetable") || name.includes("margherita") || name.includes("pancake") || name.includes("french toast") || cat.includes("dessert") || cat.includes("drinks")) {
    allergens.push({ name: "Vegetarian", type: "success", icon: "🌱" });
  }

  allergens.push({ name: "100% Nut-Free Kitchen", type: "success", icon: "🥜" });

  // 4. Calories & Prep time
  const priceNum = Number(String(dish.menuItemPrice || dish.recipesPrice || "$15").replace(/[^0-9.]/g, "")) || 15;
  const calories = `${Math.round(280 + priceNum * 18)} kcal`;
  const prepTime = `${Math.min(30, Math.max(12, Math.round(priceNum * 0.9)))} - ${Math.min(40, Math.max(18, Math.round(priceNum * 1.3)))} mins`;

  return {
    ingredients,
    spiciness,
    allergens,
    calories,
    prepTime,
  };
}
