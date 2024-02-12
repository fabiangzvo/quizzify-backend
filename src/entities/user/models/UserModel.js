const { Schema } = require("mongoose");

const { db } = require("../../../configs/DatabaseConfig");

const schema = new Schema(
  {
    fullName: {
      type: Schema.Types.String,
    },
    email: {
      type: Schema.Types.String,
    },
    password: {
      type: Schema.Types.String,
    },
    userName: {
      type: Schema.Types.String,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = db.model("users", schema);
