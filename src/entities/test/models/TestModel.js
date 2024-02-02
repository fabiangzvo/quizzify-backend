const { Schema } = require("mongoose");

const { db } = require("@configs/DatabaseConfig");

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
    },
    description: {
      type: Schema.Types.String,
    },
    questions: {
      type: [Schema.Types.ObjectId],
      ref: "questions",
    },
    createdAt: { type: Date },
  },
  {
    collection: "tests",
    timestamps: true,
  }
);

module.exports = db.model("tests", schema);
