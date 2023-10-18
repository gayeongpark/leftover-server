const express = require("express");
const Preferences = require("../models/preferences.model.js");
// const authenticateUser = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/allergies", async (req, res) => {
  try {
    const { userEmail, userId, allergies } = req.body;

    const preferences = new Preferences({
      userEmail,
      userId,
      allergies,
    });

    await preferences.save();

    res.status(200).json({ message: "Data stored successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error storing data" });
  }
});

router.post("/cookPreference", async (req, res) => {
  try {
    const { userEmail, cook } = req.body;
    const user = await Preferences.findOneAndUpdate({ userEmail }, { cook });

    if (user) {
      res.status(200).json({ message: "Data is successfully updated" });
    } else {
      res.status(404).json("User not found!");
    }
  } catch (error) {
    res.status(500).json({ error: "Error storing data" });
  }
});

router.post("/diet", async (req, res) => {
  try {
    const { userEmail, diet } = req.body;
    const user = await Preferences.findOneAndUpdate({ userEmail }, { diet });

    if (user) {
      res.status(200).json({ message: "Data is successfully updated" });
    } else {
      res.status(404).json("User not found!");
    }
  } catch (error) {
    res.status(500).json({ error: "Error storing data" });
  }
});

module.exports = router;
