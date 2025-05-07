const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

// @desc Login Admin
exports.loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (admin && (await admin.matchPassword(password))) {
    const token = jwt.sign(
      { id: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.json({
      _id: admin._id,
      username: admin.username,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});
