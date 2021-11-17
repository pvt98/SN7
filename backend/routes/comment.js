const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
//const multer = require('../middleware/multer-config');

// Routes pour les commentaires
router.post("/new/:id", auth, commentsCtrl.createComment);
router.get("/comments/:id", auth, commentsCtrl.getComments); // ava,t /:id/comments
router.delete("/:idpost/comment/:idcom", auth, commentsCtrl.deleteComment);

module.exports = router;