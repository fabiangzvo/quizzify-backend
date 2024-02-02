module.exports = {
  additionalProperties: false,
  type: "object",
  required: ["correctAnswers", "rating", "test", "presentedAt", "answers"],
  properties: {
    time: { type: "number" },
    correctAnswers: { type: "number" },
    rating: { type: "number" },
    test: { type: "string" },
    presentedAt: { type: "string", format: "date-time" },
    answers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          questionId: { type: "string" },
          optionId: { type: "string" },
          isCorrect: { type: "boolean" },
        },
      },
    },
  },
};
