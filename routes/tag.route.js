const router = require("express").Router();
const { createTag } = require("../controllers/tag.controller.js");
const { getListTag } = require("../controllers/tag.controller.js");
const { updateTag } = require("../controllers/tag.controller.js");
const { deleteTag } = require("../controllers/tag.controller.js");

router.post("/", createTag);
router.get("/:id", getListTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

module.exports = router;