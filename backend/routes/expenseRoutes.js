const express = require("express");
const router = express.Router();
const { getExpenses, addExpense, deleteExpense, updateExpense } = require("../controllers/expenseController");

// Route to get all expenses and add a new expense
router.route("/")
    .get(getExpenses)
    .post(addExpense);

// Route to update and delete a specific expense by its MongoDB ID
router.route("/:id")
    .put(updateExpense)
    .delete(deleteExpense);

module.exports = router;