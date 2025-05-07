const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel");
const { body, validationResult } = require("express-validator");
const { getIO } = require("../socket");

// GET all feedbacks
exports.getFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find();
  const feedbacksWithDaysAgo = feedbacks.map((fb) => {
    const now = new Date();
    const created = new Date(fb.createdAt);
    const diffTime = Math.abs(now - created);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return {
      ...fb._doc,
      daysAgo: diffDays,
    };
  });

  res.json(feedbacksWithDaysAgo);
});

// CREATE feedback
exports.createFeedback = [
  body("company").notEmpty(),
  body("badgeLetter").notEmpty(),
  body("upvoteCount").optional().isInt(),
  body("daysAgo").isInt(),
  body("text").notEmpty().contains("#"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(
        errors
          .array()
          .map((e) => e.msg)
          .join(", ")
      );
    }
    const feedback = await Feedback.create(req.body);

    const io = getIO();
    io.emit("newFeedback", feedback);
    console.log("newFeedback emitted");

    res.status(201).json(feedback);
  }),
];

// UPDATE full feedback (admin only)
exports.updateFeedback = [
  body("company").optional().notEmpty(),
  body("badgeLetter").optional().notEmpty(),
  body("upvoteCount").optional().isInt(),
  body("daysAgo").optional().isInt(),
  body("text").optional().notEmpty(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(
        errors
          .array()
          .map((e) => e.msg)
          .join(", ")
      );
    }
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      res.status(404);
      throw new Error("Feedback not found");
    }
    Object.assign(feedback, req.body);
    const updated = await feedback.save();
    res.json(updated);
  }),
];

// DELETE feedback (admin only)
exports.deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) {
    res.status(404);
    throw new Error("Feedback not found");
  }
  await feedback.remove();
  res.json({ message: "Feedback deleted" });
});

// UPVOTE feedback (anyone)
exports.upvoteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) {
    res.status(404);
    throw new Error("Feedback not found");
  }
  feedback.upvoteCount += 1;
  const updated = await feedback.save();
  res.json(updated);
});
