const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.checkToken = async (req, res, next) => {
  try {
    if (req.headers["x-access-token"]) {
      // verify token
      const accessToken = req.headers["x-access-token"];
      const { _id, email, exp } = jwt.verify(accessToken, process.env.SECRET);

      res.locals.userData = await User.findById(_id);
      next();
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Bad token", errors: error });
  }
};

exports.checkLoggedIn = (req, res, next) => {
  const user = res.locals.userData;
  if (!user) return res.status(401).json({ error: "Please log in" });

  req.user = user;
  next();
};
