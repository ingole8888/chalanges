// CHALANGE - 1 : Food Delivery Application Price Calculator

function calculateTotalPrice(items, borough, userType, dayOfWeek, tip, promoCode) {
    // Menu Prices
    const menuPrices = {
        pizza: { small: 10, medium: 15, large: 20 },
        pasta: 20,
        salad: 15,
    };

    // Delivery Fees
    const deliveryFees = {
        Manhattan: 5,
        Brooklyn: 6,
        "The Bronx": 6,
        Queens: 4,
        "Staten Island": 10,
    };

    // Weekday Discounts
    const weekdayDiscount = 2;

    // Thursday Discount
    const thursdayDiscount = 3;

    // Special Discounts
    const seniorDiscount = 2;
    const studentDiscount = 1;

    // Calculate base prices based on items
    let subtotal = 0;
    items.forEach(item => {
        if (item.item === 'pizza') {
            subtotal += menuPrices.pizza[item.size] * item.quantity;
        } else {
            subtotal += menuPrices[item.item] * item.quantity;
        }
    });

    // Apply discounts and promo codes
    if (dayOfWeek === 'Thursday') {
        subtotal -= thursdayDiscount;
    }

    if (userType === 'senior') {
        subtotal -= seniorDiscount;
    } else if (userType === 'student') {
        subtotal -= studentDiscount;
    }

    if (items.length >= 8 || subtotal > 100) {
        deliveryFees[borough] = 0; // Free delivery for large orders
    }

    if (promoCode === '30-OFF') {
        subtotal *= 0.7; // 30% off
    } else if (promoCode === 'HALF-OFF-PIZZA') {
        subtotal -= menuPrices.pizza.medium * items.filter(item => item.item === 'pizza').length / 2;
    } else if (promoCode === 'FREEDELIVERY') {
        deliveryFees[borough] = 0; // Free delivery promo
    }

    // Calculate and apply tax
    const taxRate = 0.1;
    const tax = subtotal * taxRate;

    // Calculate total with gratuity
    let total = subtotal + tax + deliveryFees[borough];

    if (tip.type === 'percentage') {
        total += (subtotal + tax) * (tip.value / 100);
    } else {
        total += tip.value;
    }

    return total;
}

// Example usage
let totalPrice = calculateTotalPrice(
    [{ item: 'pizza', size: 'medium', quantity: 2 }, { item: 'pasta', quantity: 1 }],
    'Brooklyn',
    'student',
    'Wednesday',
    { type: 'percentage', value: 10 },
    'HALF-OFF-PIZZA'
);

console.log(`Total Price: $${totalPrice}`);



// CHALANGE - 2 : Compose Functions

function compose(pipeline) {
    return function (value) {
        return pipeline.reduce((result, func) => func(result), value);
    };
}

// Example 1
const pipeline1 = [
    (num) => num - 1,
    (num) => num * 10,
    (num) => `${num} as a string`
];

const composed1 = compose(pipeline1);
console.log(composed1(4)); // Output: `30 as a string`

// Example 2
const pipeline2 = [
    (str) => str.length,
    (length) => length * 100,
    (num) => num + 5
];

const composed2 = compose(pipeline2);
console.log(composed2('cat')); // Output: 305


// CHALANGE - 3: Missing Lowercase Letters

function letters(word) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const lowercaseLettersNotInWord = alphabet
        .split('')
        .filter(letter => !word.includes(letter));

    return lowercaseLettersNotInWord;
}

// Example 1
const word1 = 'abc';
console.log(letters(word1));

// Example 2
const word2 = 'can';
console.log(letters(word2));

// CHALANGE - 4 : Debug Morning Routine

'use strict';

class Student {
    constructor() {
        this.minutesLeft = 60;
    }

    wakeUp() {
        console.log('waking up...');
    }

    showerAndBrushTeeth() {
        console.log('walking downstairs');
        this.minutesLeft -= 30;
    }

    eat() {
        console.log('eating...');
        this.minutesLeft -= 30;
        this.digest();
    }

    catchBus() {
        console.log(`walking to the bus with ${this.minutesLeft} minutes left`);
        this.minutesLeft = 0;
    }

    digest() {
        console.log('digesting...');
        this.catchBus();
    }
}

function morningRoutine() {
    const student = new Student();

    student.wakeUp();
    student.showerAndBrushTeeth();

    const actionToTake = student.minutesLeft >= 30 ? student.eat.bind(student) : student.catchBus.bind(student);

    actionToTake();
}

morningRoutine();

//Changes made:

// 1) Reordered the methods in the Student class to ensure the correct sequence of actions.
// 2) Used .bind(student) when assigning eat or catchBus to actionToTake to maintain the correct this context.


// CHALANGE - 5 : One to Ten Timer

function oneToTenTimer() {
    let count = 1;

    const intervalId = setInterval(() => {
        console.log(count);

        if (count === 10) {
            clearInterval(intervalId); // Stop the interval when count reaches 10
        } else {
            count++;
        }
    }, 1000);
}

// Call the function to start the timer
oneToTenTimer();
