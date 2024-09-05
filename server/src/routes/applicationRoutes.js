const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
// const verifyToken = require('../middlewares/verifyToken');

router.post("/adoption", applicationController.createAdoptionApplication);

router.post("/rehome", applicationController.createRehomeApplication);

router.post("/funeral", applicationController.createFuneralApplication);

// router.get("/:id", applicationController.fetchApplication);

module.exports = router;
