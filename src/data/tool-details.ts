import { FAQ } from "./tools";

export interface ToolDetail {
    howToUse: string[];
    faqs: FAQ[];
    longDescription?: string;
}

export const toolDetails: Record<string, ToolDetail> = {
    // Pregnancy & Baby
    "due-date-calculator": {
        howToUse: [
            "Enter the first day of your last menstrual period (LMP).",
            "Select your average menstrual cycle length (default is 28 days).",
            "Click 'Calculate Due Date' to see your estimated due date.",
            "View your current pregnancy progress, trimester, and days remaining.",
        ],
        faqs: [
            {
                question: "How accurate is the due date calculator?",
                answer: "Our calculator uses Naegele's Rule, the standard medical method. However, only about 5% of babies are born on their exact due date. Most arrive within two weeks before or after.",
            },
            {
                question: "What if I don't know my LMP?",
                answer: "If you don't know your last menstrual period date, an ultrasound scan performed by your doctor can provide a more accurate due date estimation.",
            },
            {
                question: "Can I calculate due date by conception date?",
                answer: "Yes, if you know the exact date of conception, you can add 266 days to that date to estimate your due date.",
            },
        ],
    },
    "ovulation-calculator": {
        howToUse: [
            "Select the first day of your last period.",
            "Enter your average cycle length (usually between 21 and 35 days).",
            "Click 'Calculate Ovulation' to see your fertile window.",
            "The calendar will highlight your most fertile days and estimated ovulation date.",
        ],
        faqs: [
            {
                question: "When am I most fertile?",
                answer: "You are generally most fertile during the 5 days leading up to ovulation and the day of ovulation itself. This is your 'fertile window'.",
            },
            {
                question: "How do I know if I am ovulating?",
                answer: "Signs of ovulation include changes in cervical mucus (becoming clear and stretchy), a slight rise in basal body temperature, and mild pelvic pain (mittelschmerz).",
            },
        ],
    },
    "pregnancy-week-calculator": {
        howToUse: [
            "Enter your due date or the first day of your last period.",
            "Click 'Calculate Week' to see your current progress.",
            "Discover which trimester you are in and how many weeks/days are left.",
            "Read about your baby's development for that specific week.",
        ],
        faqs: [
            {
                question: "How are pregnancy weeks counted?",
                answer: "Pregnancy is counted from the first day of your last menstrual period, not from the date of conception. This means you are technically considered 'pregnant' about two weeks before conception actually occurs.",
            },
            {
                question: "How long is a full-term pregnancy?",
                answer: "A full-term pregnancy is considered to be 40 weeks, or 280 days. However, anything between 37 and 42 weeks is considered normal.",
            },
        ],
    },

    // Health & Fitness
    "bmi-calculator": {
        howToUse: [
            "Choose your preferred unit system (Metric or Imperial).",
            "Enter your height in cm or feet/inches.",
            "Enter your weight in kg or lbs.",
            "Click 'Calculate BMI' to see your Body Mass Index.",
            "Check the result against standard BMI categories (Underweight, Normal, Overweight, Obese).",
        ],
        faqs: [
            {
                question: "Is BMI accurate for everyone?",
                answer: "BMI is a useful screening tool but doesn't account for muscle mass, bone density, or fat distribution. Athletes may have a high BMI due to muscle mass but low body fat.",
            },
            {
                question: "What is a healthy BMI range?",
                answer: "For most adults, a BMI between 18.5 and 24.9 is considered healthy. However, individual health factors should always be considered.",
            },
        ],
    },
    "calorie-calculator": {
        howToUse: [
            "Enter your age, gender, height, and weight.",
            "Select your activity level (Sedentary to Extra Active).",
            "Choose your goal: Maintain weight, lose weight, or gain weight.",
            "Click 'Calculate' to see your daily calorie needs.",
        ],
        faqs: [
            {
                question: "What is BMR?",
                answer: "BMR stands for Basal Metabolic Rate. It represents the number of calories your body needs to perform basic life-sustaining functions like breathing and circulation while at rest.",
            },
            {
                question: "How many calories should I cut to lose weight?",
                answer: "A safe rate of weight loss is generally 0.5 to 1 kg (1-2 lbs) per week. This typically requires a calorie deficit of 500-1000 calories per day.",
            },
        ],
    },
    "body-fat-calculator": {
        howToUse: [
            "Select your gender and unit system (Metric/Imperial).",
            "Enter your age, weight, and height.",
            "Measure and enter your neck and waist circumference.",
            "For females, also enter your hip circumference.",
            "Click 'Calculate Body Fat' to see your percentage and category.",
        ],
        faqs: [
            {
                question: "How accurate is the U.S. Navy method?",
                answer: "The U.S. Navy method is widely used and considered reasonably accurate for the general population. However, professional methods like DEXA scans or hydrostatic weighing are more precise.",
            },
            {
                question: "What is a healthy body fat percentage?",
                answer: "Healthy ranges vary by age and gender. Generally, 18-24% for fit men and 25-31% for fit women is considered average/healthy.",
            },
        ],
    },

    // Finance & Money
    "loan-calculator": {
        howToUse: [
            "Enter the total loan amount.",
            "Input the annual interest rate (%).",
            "Set the loan term in years or months.",
            "Click 'Calculate' to see your monthly payment.",
            "Review the total interest paid and total cost of the loan.",
        ],
        faqs: [
            {
                question: "Does this calculator include taxes and insurance?",
                answer: "No, this calculator estimates principal and interest only. For mortgages, property taxes and insurance are usually extra.",
            },
            {
                question: "What is amortization?",
                answer: "Amortization is the process of paying off a debt over time through regular payments. A portion of each payment goes towards interest and the rest towards the principal.",
            },
        ],
    },
    "compound-interest-calculator": {
        howToUse: [
            "Enter your initial investment (principal).",
            "Input the monthly contribution you plan to make.",
            "Set the estimated annual interest rate.",
            "Choose the investment duration in years.",
            "Click 'Calculate' to see how your money grows over time.",
        ],
        faqs: [
            {
                question: "What is compound interest?",
                answer: "Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. It's 'interest on interest'.",
            },
            {
                question: "How often is interest compounded in this calculator?",
                answer: "This calculator assumes interest is compounded annually for simplicity, which is common for many investment projections.",
            },
        ],
    },
    "tip-calculator": {
        howToUse: [
            "Enter the total bill amount.",
            "Select your desired tip percentage (or enter a custom one).",
            "Enter the number of people splitting the bill.",
            "See the tip amount, total bill, and amount per person instantly.",
        ],
        faqs: [
            {
                question: "What is a standard tip amount?",
                answer: "In the United States, a standard tip for restaurant service is typically between 15% and 20% of the pre-tax bill.",
            },
            {
                question: "Should I tip on the tax?",
                answer: "Etiquette generally suggests tipping on the pre-tax subtotal, but many people tip on the total for simplicity.",
            },
        ],
    },

    // Date & Time
    "age-calculator": {
        howToUse: [
            "Enter your date of birth.",
            "The 'Calculate Age At' date defaults to today, but you can change it.",
            "Click 'Calculate Age' to see your age in years, months, and days.",
            "View additional details like total days, hours, or minutes lived.",
        ],
        faqs: [
            {
                question: "Does this account for leap years?",
                answer: "Yes, our calculator accurately accounts for leap years when calculating the exact number of days.",
            },
            {
                question: "Can I calculate the age of a historical event?",
                answer: "Absolutely! Just enter the start date of the event as the 'Date of Birth' to see how much time has passed since then.",
            },
        ],
    },
    "days-between-dates": {
        howToUse: [
            "Select the Start Date.",
            "Select the End Date.",
            "Click 'Calculate' to see the duration.",
            "The result shows the total days, as well as the breakdown in years, months, and days.",
        ],
        faqs: [
            {
                question: "Is the end date included in the count?",
                answer: "Typically, the calculation measures the duration between dates, so the start date is included but the end date is often exclusive depending on context. Our calculator gives the full span.",
            },
        ],
    },

    // Unit Converter
    "length-converter": {
        howToUse: [
            "Enter the value you want to convert.",
            "Select the 'From' unit (e.g., Meters).",
            "Select the 'To' unit (e.g., Feet).",
            "The result updates automatically as you type.",
        ],
        faqs: [
            {
                question: "What units are supported?",
                answer: "We support common metric and imperial units including millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.",
            },
        ],
    },
    "weight-converter": {
        howToUse: [
            "Enter the weight value.",
            "Choose the starting unit (e.g., Kilograms).",
            "Choose the target unit (e.g., Pounds).",
            "Get the instant conversion result.",
        ],
        faqs: [
            {
                question: "How many pounds are in a kilogram?",
                answer: "There are approximately 2.20462 pounds in one kilogram.",
            },
        ],
    },
    "temperature-converter": {
        howToUse: [
            "Enter the temperature value.",
            "Select Celsius, Fahrenheit, or Kelvin.",
            "The calculator instantly converts the value to the other two scales.",
        ],
        faqs: [
            {
                question: "What is the formula for Celsius to Fahrenheit?",
                answer: "Multiply by 1.8 (or 9/5) and add 32. Formula: (°C × 9/5) + 32 = °F.",
            },
        ],
    },
    "speed-converter": {
        howToUse: [
            "Input the speed value.",
            "Select the unit to convert from (e.g., MPH).",
            "Select the unit to convert to (e.g., KM/H).",
            "View the converted speed instantly.",
        ],
        faqs: [
            {
                question: "What is 1 knot in mph?",
                answer: "1 knot is approximately equal to 1.15078 miles per hour (mph).",
            },
        ],
    },

    // Math & Numbers
    "percentage-calculator": {
        howToUse: [
            "Choose the type of calculation (e.g., 'What is X% of Y?').",
            "Enter the values in the input fields.",
            "Click 'Calculate' to see the result.",
        ],
        faqs: [
            {
                question: "What is the percentage formula?",
                answer: "To find P% of X, use the formula: (P / 100) * X.",
            },
        ],
    },
    "discount-calculator": {
        howToUse: [
            "Enter the original price of the item.",
            "Enter the discount percentage.",
            "Click 'Calculate' to see the savings and final price.",
        ],
        faqs: [
            {
                question: "How do I calculate a discount manually?",
                answer: "Multiply the original price by the discount percentage (as a decimal) to get the savings. Subtract savings from the original price to get the final price.",
            },
        ],
    },
};
