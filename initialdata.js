require("dotenv").config();

const db = require("./config/firebase");

async function initialdata() {
  try {
    // Write user info
    const userRef = await db.ref("users").push();
    await userRef.set({
      id:1,
      name: "Femi Ola",
      username: "Femi",
      email: "oluwafemi@sozentech.com",
      address: {
        street: "Panatella Drive",
        suite: "Apt. 556",
        city: "Calgary",
        zipcode: "T3I 3W2",
      },
    });

    // Write income info
    const incomeRef = await db.ref("income").push();
    await incomeRef.set({
      id:1,
      wages: 1400,
      "secondary income": 700,
      Interest: 120,
      "support payment": 40,
      others: 100,
    });

    // Write expense info
    const expenseRef = await db.ref("expense").push();
    await expenseRef.set({
      id:1,
      Savings: {
        RRSP: "1000$",
        "Investment Savings": 4000,
        "Long-term savings": 5000,
        Bonds: 200,
        others: 500,
      },
      "Payment Obligations": {
        "credit card": 500,
        Loan: 6000,
        "vehicle lease": 200,
        "line of credit": 1000,
      },
      Insurance: {
        "life insurance": 400,
        "health insurance": 600,
        others: 300,
      },
      Housing: {
        Rent: 600,
        "rent insurance": 400,
        "storage and parking": 500,
        utilities: 200,
        maintainance: 100,
      },
      Utilities: {
        phone: 600,
        Internet: 300,
        water: 400,
        Head: 100,
        Electricity: 400,
        Cable: 200,
        others: 150,
      },
      Personal: {
        transportation: 50,
        clothing: 60,
        "gifts - family": 40,
        "Personal grooming": 100,
        "dining out": 300,
        Hobbies: 200,
        others: 60,
      },
    });

    console.log("Initial data written to Firebase!");
  } catch (error) {
    console.error("Error initializing data:", error.message);
  }
}


initialdata();