const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EUSER,
    pass: process.env.EPASS,
  },
});

const registerEmail = async (userEmail, emailToken) => {
  try {
    let mailGenerator = new mailgen({
      theme: "default",
      product: {
        name: "FlickBase",
        link: `${process.env.MAIN_DOMAIN}`,
      },
    });

    const email = {
      body: {
        name: userEmail,
        intro:
          "Welcome to FlickBase! We are very excited to have you on board!",
        action: {
          instruction: "Please click here to validate your account!",
          button: {
            color: "#1a73e8",
            text: "Validate",
            link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`,
          },
        },
        outro:
          "Need help or have any questions? Just reply to this email, we'd love to help!",
      },
    };

    let emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EUSER,
      to: userEmail,
      subject: "Welcome to FlickBase!",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {}
};

const contactMail = async (contact) => {
  try {
    let mailGenerator = new mailgen({
      theme: "default",
      product: {
        name: "FlickBase",
        link: `${process.env.MAIN_DOMAIN}`,
      },
    });

    ////////////////Template////////////////
    const email = {
      body: {
        intro: [
          "Someone sent you a message",
          `Email: ${contact.email}`,
          `Firstname: ${contact.firstname}`,
          `Lastname: ${contact.lastname}`,
        ],
        outro: [`${contact.message}`],
      },
    };

    let emailBody = mailGenerator.generate(email);

    let message = {
      from: process.env.EUSER,
      to: process.env.EUSER,
      subject: "Contact",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    if (error) throw error;
  }
};

module.exports = {
  contactMail,
  registerEmail,
};
