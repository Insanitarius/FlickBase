const express = require("express");
let router = express.Router();
require("dotenv").config();
const { checkLoggedIn } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");

//model
const { Article } = require("../../models/articleModel");

router
  .route("/admin/add_articles")
  .post(
    checkLoggedIn,
    grantAccess("createAny", "article"),
    async (req, res) => {
      try {
        const article = new Article({
          ...req.body,
          score: parseInt(req.body.score),
        });

        const result = await article.save();

        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: "Error adding article", error: error });
      }
    }
  );

router
  .route("/admin/:id")
  .get(checkLoggedIn, grantAccess("readAny", "article"), async (req, res) => {
    try {
      const _id = req.params.id;
      const article = await Article.findById(_id);
      if (!article || article.length === 0) {
        return res.status(400).json({ message: "Article not found" });
      }

      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({ message: "Error fetching article", error: error });
    }
  })
  .patch(
    checkLoggedIn,
    grantAccess("updateAny", "article"),
    async (req, res) => {
      try {
        const article = await Article.findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $set: req.body,
          },
          { new: true }
        );
        if (!article)
          return res.status(400).json({ message: "Article not found" });

        res.status(200).json(article);
      } catch (error) {
        res
          .status(400)
          .json({ message: "Error updating article", error: error });
      }
    }
  )
  .delete(
    checkLoggedIn,
    grantAccess("deleteAny", "article"),
    async (req, res) => {
      try {
        const article = await Article.findByIdAndRemove({ _id: req.params.id });
        if (!article)
          return res.status(400).json({ message: "Article not found" });

        res
          .status(200)
          .json({ _id: article._id, message: "Deleted successfully" });
      } catch (error) {
        res
          .status(400)
          .json({ message: "Error deleting article", error: error });
      }
    }
  );

module.exports = router;
