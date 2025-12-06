export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const categories: Category[] = [
  {
    id: "pregnancy",
    name: "Pregnancy & Baby",
    slug: "pregnancy",
    description: "Calculators for expecting parents and new families",
    icon: "🤰",
    color: "#ff6b84",
  },
  {
    id: "finance",
    name: "Finance & Money",
    slug: "finance",
    description: "Financial planning and money calculators",
    icon: "💰",
    color: "#10b981",
  },
  {
    id: "health",
    name: "Health & Fitness",
    slug: "health",
    description: "Health, fitness and wellness calculators",
    icon: "❤️",
    color: "#ef4444",
  },
  {
    id: "date",
    name: "Date & Time",
    slug: "date",
    description: "Date, time and age calculators",
    icon: "📅",
    color: "#f59e0b",
  },
  {
    id: "converter",
    name: "Unit Converter",
    slug: "converter",
    description: "Convert between different units of measurement",
    icon: "📐",
    color: "#8b5cf6",
  },
  {
    id: "math",
    name: "Math & Numbers",
    slug: "math",
    description: "Mathematical and numerical calculators",
    icon: "🔢",
    color: "#0b8bef",
  },
];

export const tools: Tool[] = [
  // Pregnancy & Baby
  {
    id: "due-date-calculator",
    name: "Due Date Calculator",
    slug: "due-date-calculator",
    categoryId: "pregnancy",
    shortDescription: "Calculate your baby's due date based on your last menstrual period",
    icon: "📅",
  },
  {
    id: "ovulation-calculator",
    name: "Ovulation Calculator",
    slug: "ovulation-calculator",
    categoryId: "pregnancy",
    shortDescription: "Find your most fertile days to maximize chances of conception",
    icon: "🌸",
  },
  {
    id: "pregnancy-week-calculator",
    name: "Pregnancy Week Calculator",
    slug: "pregnancy-week-calculator",
    categoryId: "pregnancy",
    shortDescription: "Find out how many weeks pregnant you are",
    icon: "🤱",
  },
  // Health & Fitness
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    slug: "bmi-calculator",
    categoryId: "health",
    shortDescription: "Calculate your Body Mass Index and find your healthy weight range",
    icon: "⚖️",
  },
  {
    id: "calorie-calculator",
    name: "Calorie Calculator",
    slug: "calorie-calculator",
    categoryId: "health",
    shortDescription: "Calculate your daily calorie needs for weight goals",
    icon: "🍎",
  },
  // Finance & Money
  {
    id: "loan-calculator",
    name: "Loan Calculator",
    slug: "loan-calculator",
    categoryId: "finance",
    shortDescription: "Calculate monthly payments and total interest for loans",
    icon: "🏦",
  },
  {
    id: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    categoryId: "finance",
    shortDescription: "See how your money grows with compound interest over time",
    icon: "📈",
  },
  {
    id: "tip-calculator",
    name: "Tip Calculator",
    slug: "tip-calculator",
    categoryId: "finance",
    shortDescription: "Calculate tips and split bills easily",
    icon: "💳",
  },
  // Date & Time
  {
    id: "age-calculator",
    name: "Age Calculator",
    slug: "age-calculator",
    categoryId: "date",
    shortDescription: "Calculate exact age in years, months, and days",
    icon: "🎂",
  },
  {
    id: "days-between-dates",
    name: "Days Between Dates",
    slug: "days-between-dates",
    categoryId: "date",
    shortDescription: "Calculate the number of days between two dates",
    icon: "📆",
  },
  // Unit Converter
  {
    id: "length-converter",
    name: "Length Converter",
    slug: "length-converter",
    categoryId: "converter",
    shortDescription: "Convert between different length units (cm, inches, feet, meters)",
    icon: "📏",
  },
  {
    id: "weight-converter",
    name: "Weight Converter",
    slug: "weight-converter",
    categoryId: "converter",
    shortDescription: "Convert between different weight units (kg, lbs, oz)",
    icon: "🏋️",
  },
  {
    id: "temperature-converter",
    name: "Temperature Converter",
    slug: "temperature-converter",
    categoryId: "converter",
    shortDescription: "Convert between Celsius, Fahrenheit, and Kelvin",
    icon: "🌡️",
  },
  {
    id: "speed-converter",
    name: "Speed Converter",
    slug: "speed-converter",
    categoryId: "converter",
    shortDescription: "Convert between km/h, mph, m/s, knots, and more",
    icon: "🏎️",
  },
  // Math & Numbers
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    categoryId: "math",
    shortDescription: "Calculate percentages, increases, and decreases easily",
    icon: "🔢",
  },
  {
    id: "discount-calculator",
    name: "Discount Calculator",
    slug: "discount-calculator",
    categoryId: "math",
    shortDescription: "Calculate sale prices, discounts, and savings",
    icon: "🏷️",
  },
  // Additional Pregnancy
  {
    id: "pregnancy-week-calculator",
    name: "Pregnancy Week Calculator",
    slug: "pregnancy-week-calculator",
    categoryId: "pregnancy",
    shortDescription: "Track your pregnancy week by week with baby size comparisons",
    icon: "📅",
  },
  {
    id: "ovulation-calculator",
    name: "Ovulation Calculator",
    slug: "ovulation-calculator",
    categoryId: "pregnancy",
    shortDescription: "Predict your fertile window and ovulation date",
    icon: "🌸",
  },
  // Additional Health
  {
    id: "calorie-calculator",
    name: "Calorie Calculator",
    slug: "calorie-calculator",
    categoryId: "health",
    shortDescription: "Calculate daily calorie needs based on your goals",
    icon: "🍎",
  },
  {
    id: "body-fat-calculator",
    name: "Body Fat Calculator",
    slug: "body-fat-calculator",
    categoryId: "health",
    shortDescription: "Estimate body fat percentage using the U.S. Navy method",
    icon: "💪",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((tool) => tool.categoryId === categoryId);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getPopularTools(): Tool[] {
  const popularIds = [
    "due-date-calculator",
    "bmi-calculator",
    "age-calculator",
    "loan-calculator",
    "tip-calculator",
    "percentage-calculator",
  ];
  return tools.filter((tool) => popularIds.includes(tool.id));
}
