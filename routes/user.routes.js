const express = require("express");
const Preferences = require("../models/preferences.model.js");
const Auth = require("../models/auth.model.js");

const router = express.Router();

router.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userProfile = await Auth.findOne({ id });
    if (userProfile) {
      res.status(200).json({ message: "The user is founded!" });
    } else {
      res.status(404).json("User not found!");
    }

    res.status(200).json({ userProfile });
  } catch (error) {
    res.status(500).json("Not founded user profile!");
  }
});

router.get("/preferences/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userPreference = await Preferences.findOne({ userId });
    if (userPreference) {
      res.status(200).json({ message: "The user had set his preferences!" });
    } else {
      res.status(404).json("Please set your preferences");
    }

    res.status(200).json({ userPreference });
  } catch (error) {
    res.status(500).json("Not founded user preferences!");
  }
});

module.exports = router;
