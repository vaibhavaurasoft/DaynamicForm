// formLayoutRoutes.js
const express = require("express");
const router = express.Router();
const data = require("../controller/formLayoutController");

// Save form layout
router.route("/form-layout").post(data.SaveFormLayout).get(data.getAllFormLayouts)
router.route("/form-layout/:id").get(data.getLayoutsById)


module.exports = router;
