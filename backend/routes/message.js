const express = require("express");
const router = express.Router();
const messagesCtrl = require("../controllers/message");
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');

// Routes pour les messages
router.post("/add", auth, multer, messagesCtrl.create);
router.get("/messages", auth, messagesCtrl.getAll);
router.get('/:id', auth, messagesCtrl.getOneMessage);
router.delete("/:id", auth, messagesCtrl.deleteMessage);

module.exports = router;