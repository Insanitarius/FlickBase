const express = require("express");
let router = express.Router();
require("dotenv").config();
const { checkLoggedIn } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");
const { contactMail, registerEmail } = require("../../config/email");

const { User } = require("../../models/userModel");

router.route("/register").post(async (req, res) => {
  try {
    ///1 check if email taken
    if (await User.emailTaken(req.body.email)) {
      return res.status(400).json({ message: "Sorry email taken" });
    }

    /// 2 creating the model ( hash password)
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    /// 3 generate token
    const token = user.generateToken();
    const doc = await user.save();

    // 4 send email
    const emailToken = user.generateRegisterToken();
    await registerEmail(doc.email, emailToken);

    // save...send token with cookie
    res.cookie("x-access-token", token).status(200).send(getUserProps(doc));
  } catch (error) {
    res.status(400).json({ message: "Error", error: error });
  }
});

router.route("/signin").post(async (req, res) => {
  try {
    // FIND USER
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Email not found!" });

    /// COMPARE PASSWORD
    const compare = await user.comparePassword(req.body.password);
    if (!compare)
      return res.status(400).json({ message: "Incorrect password" });

    // GENERATE TOKEN
    const token = user.generateToken();

    //RESPONSE
    res.cookie("x-access-token", token).status(200).send(getUserProps(user));
  } catch (error) {
    res.status(400).json({ message: "Error", error: error });
  }
});

router
  .route("/profile")
  .get(checkLoggedIn, grantAccess("readOwn", "profile"), async (req, res) => {
    try {
      const permission = res.locals.permission;

      const user = await User.findById(req.user._id);
      if (!user) return res.status(400).json({ message: "User not found" });

      res.status(200).json(permission.filter(user._doc));
    } catch (error) {
      return res.status(300).send(error);
    }
  })
  .patch(
    checkLoggedIn,
    grantAccess("updateOwn", "profile"),
    async (req, res) => {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $set: {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              age: req.body.age,
            },
          },
          { new: true }
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(getUserProps(user));
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Problem Updating", error: error });
      }
    }
  );

router.route("/isauth").get(checkLoggedIn, async (req, res) => {
  res.status(200).send(getUserProps(req.user));
});

router
  .route("/update_email")
  .patch(
    checkLoggedIn,
    grantAccess("updateOwn", "profile"),
    async (req, res) => {
      try {
        if (await User.emailTaken(req.body.newemail)) {
          return res.status(400).json({ message: "Sorry email already taken" });
        }

        const user = await User.findOneAndUpdate(
          { _id: req.user._id, email: req.body.email },
          {
            $set: {
              email: req.body.newemail,
            },
          },
          { new: true }
        );
        if (!user) return res.status(400).json({ message: "User not found" });

        const token = user.generateToken();
        res
          .cookie("x-access-token", token)
          .status(200)
          .send({ email: user.email });
      } catch (error) {
        res.status(400).json({ message: "Problem updating", error: error });
      }
    }
  );

router.route("/contact").post(async (req, res) => {
  try {
    await contactMail(req.body);
    res.status(200).send("ok");
  } catch (error) {
    res.status(400).json({
      message: "Please try again later!",
      error: error,
    });
  }
});

router.route("/verify").get(async (req, res) => {
  try {
    const token = User.validateToken(req.query.verification);
    const user = await User.findById(token._id);
    if (!user) res.status(400).json({ message: "User not found!" });
    if (user.verified) res.status(400).json({ message: "Already Verified!" });

    user.verified = true;
    await user.save();

    res.status(200).send(getUserProps(user));
  } catch (error) {
    res.status(400).send("Verification failed, please try again!");
  }
});

const getUserProps = (user) => {
  return {
    _id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    age: user.age,
    role: user.role,
    verified: user.verified,
  };
};

module.exports = router;
