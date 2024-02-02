const { Schema } = require("mongoose");

const { db } = require("@configs/DatabaseConfig");

const schema = new Schema(
  {
    description: {
      type: Schema.Types.String,
    },
    isCorrect: {
      types: Schema.Types.Boolean,
    },
    createdAt: { type: Date },
  },
  {
    collection: "options",
    timestamps: true,
  }
);

module.exports = db.model("options", schema);
