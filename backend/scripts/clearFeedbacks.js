const mongoose = require("mongoose");
const cron = require("node-cron");
const Feedback = require("../models/feedbackModel");

const data = [
  {
    company: "Starbucks",
    badgeLetter: "S",
    upvoteCount: 563,
    text: "I really wish #Starbucks would use hand wrappers for hot drinks as a standard, I keep burning my hands and am tired of bothering the employee.",
    createdAt: new Date("2025-05-05T20:19:49.406Z"),
    updatedAt: new Date("2025-05-05T20:19:49.406Z"),
  },
  {
    company: "Netflix",
    badgeLetter: "N",
    upvoteCount: 486,
    text: "since yday on mobile #netflix keeps buffering the video, it keeps happening even when I redownload the app. I'm in an area with decent internet btw",
    createdAt: new Date("2025-05-07T20:20:05.409Z"),
    updatedAt: new Date("2025-05-07T20:20:05.409Z"),
  },
  {
    company: "McDonald's",
    badgeLetter: "M",
    upvoteCount: 377,
    text: "It's a real shame that my local #mcdonald's removed milkshakes from the menu. they were the reason I go to mcdonald's. 😩 please bring them back!",
    createdAt: new Date("2025-05-07T20:20:18.443Z"),
    updatedAt: new Date("2025-05-07T20:20:18.443Z"),
  },
  {
    company: "Amazon",
    badgeLetter: "A",
    upvoteCount: 156,
    text: "Im an #amazon prime member but don't really watch the prime video offering. instead of that I would want an option for even faster delivery 😎",
    createdAt: new Date("2025-05-07T20:20:27.752Z"),
    updatedAt: new Date("2025-05-07T20:20:27.752Z"),
  },
  {
    company: "Netflix",
    badgeLetter: "N",
    upvoteCount: 88,
    text: "would be great if #netflix could announce content removals further ahead. 😊 I dont want to get into a show only for it to be gone soon. thanks",
    createdAt: new Date("2025-05-07T20:20:36.717Z"),
    updatedAt: new Date("2025-05-07T20:20:36.717Z"),
  },
  {
    company: "Microsoft",
    badgeLetter: "M",
    upvoteCount: 42,
    text: "i've been using #microsoft teams for a couple weeks now and 1 thing that really sticks out is that navigation is too difficult. please simplify it.",
    createdAt: new Date("2025-05-07T20:20:46.576Z"),
    updatedAt: new Date("2025-05-07T20:26:06.580Z"),
  },
  {
    company: "Nike",
    badgeLetter: "N",
    upvoteCount: 39,
    text: "hi #nike I love your running shoes but it's very difficult to return them after a purchase. had to do a lot of phone calls to make it work. thanks 👍",
    createdAt: new Date("2025-05-07T20:20:56.439Z"),
    updatedAt: new Date("2025-05-07T20:20:56.439Z"),
  },
  {
    company: "McDonald's",
    badgeLetter: "M",
    upvoteCount: 22,
    text: "#mcdonald's the past few times I've been some items were missing from my order. only noticed this when I got home. straws, nuggets, fries, they missed",
    createdAt: new Date("2025-05-07T20:21:06.301Z"),
    updatedAt: new Date("2025-05-07T20:21:06.301Z"),
  },
  {
    company: "Adidas",
    badgeLetter: "A",
    upvoteCount: 9,
    text: "i like your website #adidas, but your sizing guide needs some work. it suggested an L for me but when it arrived it was too big. still kept it btw 😎",
    createdAt: new Date("2025-05-07T20:21:15.988Z"),
    updatedAt: new Date("2025-05-07T20:21:15.988Z"),
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const clearCollection = async () => {
  try {
    await Feedback.deleteMany({});
    await Feedback.insertMany(data);
    console.log("Feedback collection cleared");
  } catch (err) {
    console.error("Error clearing collection:", err);
  }
};

// Cron job to run every 30 minutes
cron.schedule("*/30 * * * *", () => {
  console.log("Running cron job to clear collection...");
  clearCollection();
});
