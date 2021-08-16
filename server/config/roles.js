const AccessControl = require("accesscontrol");

let grantObject = {
  admin: {
    profile: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    article: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
    articles: {
      "read:any": ["*"],
    },
    categories: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
      "delete:any": ["*"],
    },
  },
  user: {
    profile: {
      "read:own": ["*", "!password", "!_id", "!date"],
      "update:own": ["*"],
    },
    categories: {
      "read:any": ["*"],
    },
  },
};

const roles = new AccessControl(grantObject);

module.exports = { roles };
