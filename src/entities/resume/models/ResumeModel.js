const { Schema } = require("mongoose");

const { db } = require("@configs/DatabaseConfig");

const schema = new Schema(
  {
    time: {
      type: Schema.Types.Number,
    },
    correctAnswers: {
      type: Schema.Types.Number,
    },
    rating: {
      type: Schema.Types.Number,
    },
    test: { type: Schema.Types.ObjectId, ref: "tests" },
    presentedAt: { type: Date },
  },
  {
    collection: "resume",
    timestamps: true,
  }
);

module.exports = db.model("resume", schema);
