const { Schema, Types, Document } = require("mongoose");

const { db } = require("@configs/DatabaseConfig");

const schema = new Schema(
  {
    description: {
      type: Schema.Types.String,
    },
    options: {
      type: [Schema.Types.ObjectId],
      ref: "options",
    },
    createdAt: { type: Date },
  },
  {
    collection: "questions",
    timestamps: true,
  }
);

module.exports = db.model("questions", schema);
