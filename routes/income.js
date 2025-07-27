const express = require('express');
const router = express.Router();
const db = require("../config/firebase");

// GET - Retrieve all income
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.ref("income").once("value");
    const incomeData = snapshot.val();

    if (!incomeData) {
      return res.status(404).send("No income records found!");
    }

    const incomeList = Object.values(incomeData);
    res.json(incomeList);
  } catch (error) {
    res.status(500).send("Failed to fetch income records.");
  }
});

// POST - Add a new income data
router.post("/", async (req, res) => {
  try {
    const { wages, "secondary income": secondaryIncome, Interest, "support payment": supportPayment, others } = req.body;

    if (!wages || !secondaryIncome || !Interest || !supportPayment || !others) {
      return res.status(400).send("One or more income fields are missing.");
    }

    const snapshot = await db.ref("income").once("value");
    const incomeData = snapshot.val() || {};
    const nextId = Object.keys(incomeData).length + 1;

    const newIncome = {
      id: nextId,
      wages,
      "secondary income": secondaryIncome,
      Interest,
      "support payment": supportPayment,
      others
    };

    await db.ref("income").push(newIncome);

    res.status(201).json({
      message: "Income record created successfully.",
      income: newIncome
    });

  } catch (error) {
    res.status(500).send("Failed to add income record.");
  }
});

// PUT - Update income record by ID
router.put("/:id", async (req, res) => {
  try {
    const incomeId = parseInt(req.params.id);
    const { wages, "secondary income": secondaryIncome, Interest, "support payment": supportPayment, others } = req.body;

    const snapshot = await db.ref("income").once("value");
    const incomeData = snapshot.val();

    let incomeKey = null;
    for (const [key, income] of Object.entries(incomeData)) {
      if (income.id === incomeId) {
        incomeKey = key;
        break;
      }
    }

    if (!incomeKey) {
      return res.status(400).send(`Income record with ID ${incomeId} not found.`);
    }

    const updatedIncome = {
      ...incomeData[incomeKey],
      wages: wages || incomeData[incomeKey].wages,
      "secondary income": secondaryIncome || incomeData[incomeKey]["secondary income"],
      Interest: Interest || incomeData[incomeKey].Interest,
      "support payment": supportPayment || incomeData[incomeKey]["support payment"],
      others: others || incomeData[incomeKey].others
    };

    await db.ref(`income/${incomeKey}`).set(updatedIncome);

    res.status(201).json({
      message: `Income record with ID ${incomeId} updated successfully.`,
      income: updatedIncome
    });

  } catch (error) {
    res.status(500).send("Failed to update income record.");
  }
});

// DELETE - Delete income record by ID
router.delete("/:id", async (req, res) => {
  try {
    const incomeId = parseInt(req.params.id);

    const snapshot = await db.ref("income").once("value");
    const incomeData = snapshot.val();

    let incomeKey = null;
    for (const [key, income] of Object.entries(incomeData)) {
      if (income.id === incomeId) {
        incomeKey = key;
        break;
      }
    }

    if (!incomeKey) {
      return res.status(400).send(`Income record with ID ${incomeId} not found.`);
    }

    await db.ref(`income/${incomeKey}`).remove();

    res.status(201).json({
      message: `Income record with ID ${incomeId} has been deleted.`
    });

  } catch (error) {
    res.status(500).send("Failed to delete income record.");
  }
});

module.exports = router;
