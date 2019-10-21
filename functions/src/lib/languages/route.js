const router = require("express").Router();
const controller = require("./controller");

router.get("/all", controller.getAllLanguages);
router.get("/:language", controller.getLanguage);
router.post("/post", controller.addLanguage);

module.exports = router;
