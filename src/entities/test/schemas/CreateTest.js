module.exports = {
  additionalProperties: false,
  type: "object",
  required: ["title", "questions", "description", "topic"],
  properties: {
    title: { type: "string" },
    topic: { type: "string" },
    description: { type: "string" },
    questions: {
      type: "array",
      minItems: 10,
      items: {
        type: "object",
        properties: {
          description: { type: "string" },
          options: {
            type: "array",
            minItems: 4,
            items: {
              type: "object",
              required: ["description", "isCorrect"],
              properties: {
                description: { type: "string" },
                isCorrect: { type: "boolean" },
              },
            },
          },
        },
      },
    },
  },
};
