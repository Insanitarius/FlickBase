const express = require("express");
let router = express.Router();
require("dotenv").config();
const { checkLoggedIn } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");
const { sortArgsHelper } = require("../../config/helper");

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

router
  .route("/admin/paginate")
  .post(checkLoggedIn, grantAccess("readAny", "articles"), async (req, res) => {
    try {
      const limit = req.body.limit ? req.body.limit : 5;
      const aggQuery = Article.aggregate();
      const options = {
        page: req.body.page,
        limit,
        sort: { _id: "desc" },
      };
      const article = await Article.aggregatePaginate(aggQuery, options);

      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({ message: "Error", error: error });
    }
  });

router.route("/get_byid/:id").get(async (req, res) => {
  try {
    const article = await Article.find({
      _id: req.params.id,
      status: "public",
    });
    if (!article || article.length === 0) {
      return res.status(400).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: "Error fetching article", error: error });
  }
});

router.route("/loadmore").post(async (req, res) => {
  try {
    let sortArgs = sortArgsHelper(req.body);

    const article = await Article.find({ status: "public" })
      .sort([[sortArgs.sortBy, sortArgs.order]])
      .skip(sortArgs.skip)
      .limit(sortArgs.limit);

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: "Error fetching article", error: error });
  }
});

module.exports = router;
