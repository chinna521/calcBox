export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    publishedAt: string;
    updatedAt?: string;
    category: string;
    tags: string[];
    readingTime: number;
    featured: boolean;
    image?: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: "how-to-calculate-due-date",
        slug: "how-to-calculate-due-date",
        title: "How to Calculate Your Due Date: A Complete Guide",
        excerpt: "Learn the different methods to calculate your pregnancy due date, understand Naegele's Rule, and discover what factors can affect your estimated delivery date.",
        content: `
## Understanding Due Date Calculation

Calculating your due date is one of the first things expectant parents want to know. While no method can predict the exact day your baby will arrive, there are several reliable ways to estimate your due date.

### What is Naegele's Rule?

Naegele's Rule is the standard method used by healthcare providers worldwide. It calculates your due date by:
1. Taking the first day of your last menstrual period (LMP)
2. Adding 280 days (40 weeks)

This method assumes a 28-day menstrual cycle and that ovulation occurred on day 14.

### The Formula

**Due Date = LMP + 280 days**

Or alternatively:
**Due Date = LMP - 3 months + 7 days + 1 year**

### Factors That Can Affect Your Due Date

Several factors may cause your actual delivery date to differ from the calculated due date:

- **Irregular menstrual cycles** - If your cycles are longer or shorter than 28 days
- **Uncertain LMP date** - If you don't remember the exact date
- **Ultrasound findings** - Early ultrasounds can provide more accurate dating
- **Multiple pregnancies** - Twins or triplets often deliver earlier

### When to Use an Ultrasound Date

First-trimester ultrasounds (before 13 weeks) are the most accurate for dating a pregnancy. Your healthcare provider may adjust your due date based on:

- Crown-rump length (CRL) measurements
- Gestational sac size
- Fetal development markers

### Only 5% of Babies Arrive on Their Due Date

It's important to remember that your due date is an estimate. Statistics show:
- Only about 5% of babies are born on their exact due date
- Most babies arrive within 2 weeks before or after
- First-time mothers often deliver slightly later

### Tips for Expectant Parents

1. **Use our Due Date Calculator** for a quick estimate
2. **Track your menstrual cycles** for more accurate predictions
3. **Attend regular prenatal checkups** for professional guidance
4. **Stay flexible** - babies come on their own schedule!

### Conclusion

While calculating your due date provides a helpful timeline for pregnancy preparation, remember that it's an estimate. Work closely with your healthcare provider to monitor your pregnancy progress and prepare for your baby's arrival.
    `,
        author: "CalcBox Team",
        publishedAt: "2024-12-01",
        category: "Pregnancy",
        tags: ["pregnancy", "due date", "prenatal care", "baby"],
        readingTime: 5,
        featured: true,
    },
    {
        id: "understanding-bmi-calculator",
        slug: "understanding-bmi-calculator",
        title: "Understanding BMI: What Your Body Mass Index Really Means",
        excerpt: "Discover how BMI is calculated, what the different categories mean, and why it's just one piece of the health puzzle.",
        content: `
## What is Body Mass Index (BMI)?

Body Mass Index, or BMI, is a simple numerical measure that relates your weight to your height. It's widely used as a screening tool to categorize individuals into weight status categories.

### The BMI Formula

**Metric:** BMI = weight (kg) ÷ height² (m²)

**Imperial:** BMI = [weight (lbs) ÷ height² (in²)] × 703

### BMI Categories

| BMI Range | Category |
|-----------|----------|
| Below 18.5 | Underweight |
| 18.5 - 24.9 | Normal weight |
| 25.0 - 29.9 | Overweight |
| 30.0 and above | Obese |

### Limitations of BMI

While BMI is a useful screening tool, it has important limitations:

1. **Doesn't measure body fat directly** - BMI cannot distinguish between fat, muscle, and bone mass
2. **Athletes may have high BMI** - Muscular individuals may be classified as overweight despite being healthy
3. **Age and gender differences** - The same BMI may mean different things for different demographics
4. **Doesn't show fat distribution** - Where you carry fat matters for health

### When BMI is Useful

BMI works best as:
- A quick screening tool for populations
- A starting point for health discussions
- A way to track weight changes over time

### Better Health Indicators

Consider combining BMI with:
- **Waist circumference** - Indicates abdominal fat
- **Body fat percentage** - More accurate measure of fat
- **Blood pressure and cholesterol** - Overall health markers
- **Physical fitness levels** - Cardiovascular health

### Maintaining a Healthy BMI

Tips for achieving or maintaining a healthy weight:
1. Eat a balanced diet rich in fruits, vegetables, and whole grains
2. Exercise regularly (at least 150 minutes per week)
3. Get adequate sleep (7-9 hours for adults)
4. Manage stress effectively
5. Stay hydrated

### Conclusion

While BMI is a helpful starting point for understanding your weight status, it should be considered alongside other health metrics. Use our BMI Calculator as a reference, but consult with healthcare professionals for personalized advice.
    `,
        author: "CalcBox Team",
        publishedAt: "2024-11-28",
        category: "Health",
        tags: ["bmi", "health", "weight", "fitness"],
        readingTime: 4,
        featured: true,
    },
    {
        id: "compound-interest-guide",
        slug: "compound-interest-guide",
        title: "The Power of Compound Interest: Your Guide to Building Wealth",
        excerpt: "Learn how compound interest works, why Einstein called it the eighth wonder of the world, and how to harness its power for your financial future.",
        content: `
## What is Compound Interest?

Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. It's the reason why starting to save early can have dramatic effects on your wealth.

### The Compound Interest Formula

**A = P(1 + r/n)^(nt)**

Where:
- A = Final amount
- P = Principal (initial investment)
- r = Annual interest rate (decimal)
- n = Number of times interest compounds per year
- t = Number of years

### Simple vs. Compound Interest

| Feature | Simple Interest | Compound Interest |
|---------|-----------------|-------------------|
| Interest on | Principal only | Principal + accumulated interest |
| Growth | Linear | Exponential |
| Long-term effect | Modest | Dramatic |

### The Rule of 72

A quick way to estimate how long it takes to double your money:

**Years to Double = 72 ÷ Interest Rate**

For example, at 8% interest, your money doubles in about 9 years (72 ÷ 8 = 9).

### Starting Early Matters

Consider two investors:
- **Sarah** starts investing $200/month at age 25
- **Mike** starts investing $200/month at age 35

At age 65, with 7% annual returns:
- Sarah has: ~$525,000
- Mike has: ~$244,000

Sarah ends up with more than double, despite investing only $24,000 more!

### Maximizing Compound Interest

1. **Start as early as possible** - Time is your greatest asset
2. **Invest regularly** - Consistent contributions add up
3. **Reinvest dividends** - Let your earnings earn
4. **Choose higher frequency compounding** - Monthly beats annually
5. **Be patient** - The real magic happens over decades

### Common Compounding Frequencies

- Annually (1x per year)
- Semi-annually (2x per year)
- Quarterly (4x per year)
- Monthly (12x per year)
- Daily (365x per year)

More frequent compounding leads to slightly higher returns.

### Conclusion

Compound interest is truly one of the most powerful forces in finance. Use our Compound Interest Calculator to see how your investments can grow over time, and start putting this principle to work for your financial future.
    `,
        author: "CalcBox Team",
        publishedAt: "2024-11-25",
        category: "Finance",
        tags: ["compound interest", "investing", "savings", "finance", "wealth"],
        readingTime: 6,
        featured: true,
    },
    {
        id: "daily-calorie-needs",
        slug: "daily-calorie-needs",
        title: "How to Calculate Your Daily Calorie Needs",
        excerpt: "Understanding your Total Daily Energy Expenditure (TDEE) is key to weight management. Learn how to calculate and use this important number.",
        content: `
## Understanding Your Calorie Needs

Whether you're trying to lose weight, gain muscle, or maintain your current weight, understanding your daily calorie needs is essential.

### What is TDEE?

Total Daily Energy Expenditure (TDEE) is the total number of calories you burn in a day. It consists of:

1. **Basal Metabolic Rate (BMR)** - Calories burned at rest
2. **Thermic Effect of Food (TEF)** - Calories burned digesting food
3. **Physical Activity** - Calories burned through exercise and movement

### The Mifflin-St Jeor Equation

This is the most accurate formula for calculating BMR:

**Men:** BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5

**Women:** BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161

### Activity Multipliers

Multiply your BMR by these factors based on activity level:

| Activity Level | Multiplier |
|----------------|------------|
| Sedentary (desk job) | 1.2 |
| Light (1-3 days/week) | 1.375 |
| Moderate (3-5 days/week) | 1.55 |
| Active (6-7 days/week) | 1.725 |
| Very Active (athletes) | 1.9 |

### Calorie Goals Based on Objectives

- **Weight loss:** TDEE - 500 calories (1 lb/week loss)
- **Maintenance:** TDEE
- **Weight gain:** TDEE + 500 calories (1 lb/week gain)

### Macronutrient Distribution

A balanced approach:
- **Protein:** 30% of calories (essential for muscle)
- **Carbohydrates:** 40% of calories (energy source)
- **Fat:** 30% of calories (hormones and nutrient absorption)

### Tips for Success

1. Track your food intake for at least a week
2. Weigh yourself at the same time each day
3. Adjust calories based on progress
4. Don't go below 1,200 (women) or 1,500 (men) calories
5. Focus on whole, nutrient-dense foods

### Conclusion

Use our Calorie Calculator to determine your daily needs, then track your intake to reach your goals. Remember, sustainable changes lead to lasting results!
    `,
        author: "CalcBox Team",
        publishedAt: "2024-11-20",
        category: "Health",
        tags: ["calories", "nutrition", "weight loss", "health", "diet"],
        readingTime: 5,
        featured: false,
    },
    {
        id: "mortgage-calculator-tips",
        slug: "mortgage-calculator-tips",
        title: "Using a Loan Calculator: Tips for Smart Borrowing",
        excerpt: "Before taking out a loan, understand how monthly payments are calculated and learn strategies to save thousands in interest.",
        content: `
## Understanding Loan Payments

Whether you're buying a home, car, or funding education, understanding how loans work can save you significant money.

### The Loan Payment Formula

Monthly Payment = P × [r(1+r)^n] / [(1+r)^n - 1]

Where:
- P = Principal (loan amount)
- r = Monthly interest rate (annual rate ÷ 12)
- n = Total number of payments

### Amortization Explained

Early in your loan, most of your payment goes toward interest. Over time, more goes toward principal. This is called amortization.

**Example: $250,000 loan at 6.5% for 30 years**
- Month 1: $1,354 interest, $226 principal
- Month 180: $845 interest, $735 principal
- Month 360: $10 interest, $1,570 principal

### Strategies to Save Money

1. **Make extra payments** - Even $100/month extra can save thousands
2. **Round up payments** - Pay $1,600 instead of $1,580
3. **Biweekly payments** - 26 half-payments = 13 full payments/year
4. **Refinance when rates drop** - A 1% rate reduction can save significantly
5. **Choose shorter terms** - 15-year loans have lower rates and less total interest

### Total Interest Comparison

$250,000 loan at 6.5%:
- 30-year term: $318,861 total interest
- 15-year term: $138,737 total interest
- **Savings: $180,124!**

### Before You Borrow

Use our Loan Calculator to:
- Compare different loan scenarios
- Understand your monthly obligations
- See the total cost over the loan life
- Plan for extra payments

### Conclusion

A few minutes with a loan calculator can reveal opportunities to save tens of thousands of dollars. Make informed borrowing decisions!
    `,
        author: "CalcBox Team",
        publishedAt: "2024-11-15",
        category: "Finance",
        tags: ["loan", "mortgage", "finance", "saving money", "interest"],
        readingTime: 5,
        featured: false,
    },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
    return blogPosts.filter((post) => post.featured);
}

export function getRecentPosts(count: number = 5): BlogPost[] {
    return [...blogPosts]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, count);
}

export function getPostsByCategory(category: string): BlogPost[] {
    return blogPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
}

export function getPostsByTag(tag: string): BlogPost[] {
    return blogPosts.filter((post) => post.tags.includes(tag.toLowerCase()));
}
