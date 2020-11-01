const router = require("express").Router();
const { createBoard } = require("../controllers/board.controller.js");
const { getListBoard } = require("../controllers/board.controller.js");
const { deleteBoard } = require("../controllers/board.controller.js");
const { updateBoard } = require("../controllers/board.controller.js");

router.post("/", createBoard);
router.get("/", getListBoard);
router.delete("/:id", deleteBoard);
router.put("/:id", updateBoard);

module.exports = router;
