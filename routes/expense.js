const express = require('express');
const router = express.Router();
const db = require("../config/firebase");

// GET - Retrieve all expense records
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.ref("expense").once("value");
    const expenseData = snapshot.val();

    if (!expenseData) {
      return res.status(404).send("No expense records found!");
    }

    const expenseList = Object.values(expenseData);
    res.json(expenseList);
  } catch (error) {
    res.status(500).send("Failed to fetch expense records.");
  }
});

// POST - Add a new expense record
router.post("/", async (req, res) => {
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
      message: "Expense record created successfully.",
      expense: newExpense
    });

  } catch (error) {
    res.status(500).send("Failed to add expense record.");
  }
});

// PUT - Update expense record by ID
router.put("/:id", async (req, res) => {
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
      return res.status(400).send(`Expense record with ID ${expenseId} not found.`);
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
      message: `Expense record with ID ${expenseId} updated successfully.`,
      expense: updatedExpense
    });

  } catch (error) {
    res.status(500).send("Failed to update expense record.");
  }
});

// DELETE - Delete expense record by ID
router.delete("/:id", async (req, res) => {
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
      return res.status(400).send(`Expense record with ID ${expenseId} not found.`);
    }

    await db.ref(`expense/${expenseKey}`).remove();

    res.status(201).json({
      message: `Expense record with ID ${expenseId} has been deleted.`
    });

  } catch (error) {
    res.status(500).send("Failed to delete expense record.");
  }
});

module.exports = router;