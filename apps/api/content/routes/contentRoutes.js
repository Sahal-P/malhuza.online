const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");

router.get("/", contentController.getContent);

router.post("/", contentController.createContent);

router.put("/:document_id", contentController.updateContent);

module.exports = router;
