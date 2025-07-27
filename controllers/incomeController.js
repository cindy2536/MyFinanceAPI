// Handles business logic for income endpoints 
// Responsible for implementing specific function 

const db = require("../config/firebase");

// GET /income - Retrieve all income data
exports.getAllIncome = async (req, res) => {
  try {
    const snapshot = await db.ref("income").once("value");
    const incomeData = snapshot.val();

    //Check whether the income exists   
    if (!incomeData) {
      return res.status(404).send("No income data found!");
    }

    // only get value ,ignore key
    const incomeList = Object.values(incomeData);
    res.json(incomeList);
  } catch (error) {
    res.status(500).send("Failed to fetch income data.");
  }
};

// POST /income - Add a new income data
exports.addIncome = async (req, res) => {
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
      message: "Income data added successfully.",
      income: newIncome
    });
  } catch (error) {
    res.status(500).send("Failed to add income data.");
  }
};

// PUT /income/:id - Update an existing income data
exports.updateIncome = async (req, res) => {
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
      return res.status(400).send(`Income data with ID ${incomeId} not found.`);
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
      message: `Income data with ID ${incomeId} updated successfully.`,
      income: updatedIncome
    });
  } catch (error) {
    res.status(500).send("Failed to update income data.");
  }
};

// DELETE /income/:id - Delete an income data
exports.deleteIncome = async (req, res) => {
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
      return res.status(400).send(`Income data with ID ${incomeId} not found.`);
    }

    await db.ref(`income/${incomeKey}`).remove();

    res.status(201).json({
      message: `Income data with ID ${incomeId} has been deleted.`
    });
  } catch (error) {
    res.status(500).send("Failed to delete income data.");
  }
};
