const router = require("express").Router();
const { createBoard } = require("../controllers/board.controller.js");
const { getListBoard } = require("../controllers/board.controller.js");

router.post("/", createBoard);
router.get("/", getListBoard);

module.exports = router;
