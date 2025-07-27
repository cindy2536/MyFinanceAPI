// Handles business logic for the expense endpoints 
// Responsible for implementing specific function 

const db = require("../config/firebase");

// GET /expense - Retrieve all expense data
exports.getAllExpense = async (req, res) => {
  try {
    const snapshot = await db.ref("expense").once("value");
    const expenseData = snapshot.val();

    if (!expenseData) {
      return res.status(404).send("No expense data found!");
    }

    const expenseList = Object.values(expenseData);
    res.json(expenseList);
  } catch (error) {
    res.status(500).send("Failed to fetch expense data.");
  }
};

// POST /expense - Add a new expense data
exports.addExpense = async (req, res) => {
  try {
    const { Savings, "Payment Obligations": PaymentObligations, Insurance, Housing, Utilities, Personal } = req.body;

    if (!Savings || !PaymentObligations || !Insurance || !Housing || !Utilities || !Personal) {
      return res.status(400).send("One or more expense fields are missing.");
    }

    const snapshot = await db.ref("expense").once("value");
    const expenseData = snapshot.val() || {};
    
    const nextId = Object.keys(expenseData).length + 1;

    const newExpense = {
      id: nextId,
      Savings,
      "Payment Obligations": PaymentObligations,
      Insurance,
      Housing,
      Utilities,
      Personal
    };

    await db.ref("expense").push(newExpense);

    res.status(201).json({
      message: "Expense data added successfully.",
      expense: newExpense
    });
  } catch (error) {
    res.status(500).send("Failed to add expense data.");
  }
};

// PUT /expense/:id - Update an existing expense data
exports.updateExpense = async (req, res) => {
  try {
    const expenseId = parseInt(req.params.id);
    const { Savings, "Payment Obligations": PaymentObligations, Insurance, Housing, Utilities, Personal } = req.body;

    const snapshot = await db.ref("expense").once("value");
    const expenseData = snapshot.val();

    let expenseKey = null;
    for (const [key, expense] of Object.entries(expenseData)) {
      if (expense.id === expenseId) {
        expenseKey = key;
        break;
      }
    }

    if (!expenseKey) {
      return res.status(400).send(`Expense data with ID ${expenseId} not found.`);
    }

    const updatedExpense = {
      ...expenseData[expenseKey],
      Savings: Savings || expenseData[expenseKey].Savings,
      "Payment Obligations": PaymentObligations || expenseData[expenseKey]["Payment Obligations"],
      Insurance: Insurance || expenseData[expenseKey].Insurance,
      Housing: Housing || expenseData[expenseKey].Housing,
      Utilities: Utilities || expenseData[expenseKey].Utilities,
      Personal: Personal || expenseData[expenseKey].Personal
    };

    await db.ref(`expense/${expenseKey}`).set(updatedExpense);

    res.status(201).json({
      message: `Expense data with ID ${expenseId} updated successfully.`,
      expense: updatedExpense
    });
  } catch (error) {
    res.status(500).send("Failed to update expense data.");
  }
};

// DELETE /expense/:id - Delete an expense data
exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = parseInt(req.params.id);

    const snapshot = await db.ref("expense").once("value");
    const expenseData = snapshot.val();

    let expenseKey = null;
    for (const [key, expense] of Object.entries(expenseData)) {
      if (expense.id === expenseId) {
        expenseKey = key;
        break;
      }
    }

    if (!expenseKey) {
      return res.status(400).send(`Expense data with ID ${expenseId} not found.`);
    }

    await db.ref(`expense/${expenseKey}`).remove();

    res.status(201).json({
      message: `Expense data with ID ${expenseId} has been deleted.`
    });
  } catch (error) {
    res.status(500).send("Failed to delete expense data.");
  }
};
