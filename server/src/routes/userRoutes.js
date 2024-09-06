const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const verifyToken = require('../middlewares/verifyToken');

router.get("/shelters", userController.fetchOrganizations);

router.get("/:id", userController.fetchUser);

router.post("/multiple", userController.fetchUsersByIds);

module.exports = router;
