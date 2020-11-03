const router = require("express").Router();
const { createTag } = require("../controllers/tag.controller.js");
const { retriveListTag } = require("../controllers/tag.controller.js");
const { updateTag } = require("../controllers/tag.controller.js");
const { deleteTag } = require("../controllers/tag.controller.js");

router.post("/", createTag);
router.get("/:id", retriveListTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

module.exports = router;