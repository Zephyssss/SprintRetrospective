const router = require("express").Router();
const { createTag } = require("../controllers/tag.controller.js");

router.post("/", createTag);

module.exports = router;