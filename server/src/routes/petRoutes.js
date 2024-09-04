const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");

router.get("/petlist", petController.getPets);

router.get("/:id", petController.getPet);

router.post("/add", petController.createPet);

module.exports = router;
