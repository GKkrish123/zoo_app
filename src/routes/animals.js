const express = require("express");
const {
  getAnimals,
  addAnimal,
  editAnimal,
  deleteAnimal,
} = require("../controllers/animals");

const router = express.Router();

/* Get animals */
router.get("/", getAnimals);

/* Add a new animal */
router.post("/", addAnimal);

/* Update a specific animal */
router.put("/:id", editAnimal);

/* Delete a specific animal */
router.delete("/:id", deleteAnimal);

module.exports = router;
