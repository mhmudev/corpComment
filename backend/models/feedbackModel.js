const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    badgeLetter: { type: String, required: true },
    upvoteCount: { type: Number, default: 0 },
    // daysAgo: { type: Number, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
