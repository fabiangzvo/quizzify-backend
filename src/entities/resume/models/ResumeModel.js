const { Schema } = require("mongoose");

const { db } = require("@configs/DatabaseConfig");

const answersSchema = new Schema(
  {
    questionId: Schema.Types.String,
    optionId: Schema.Types.String,
    isCorrect: Schema.Types.Boolean,
  },
  {
    timestamps: true,
  }
);

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
    answers: {
      type: [
        {
          questionId: Schema.Types.String,
          optionId: Schema.Types.String,
          isCorrect: Schema.Types.Boolean,
        },
      ],
    },
  },
  {
    collection: "resume",
    timestamps: true,
  }
);

module.exports = db.model("resume", schema);
