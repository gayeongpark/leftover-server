const express = require("express");
const Preferences = require("../models/preferences.model.js");

const router = express.Router();

router.post("/allergies", async (req, res) => {
  try {
    const { userEmail, userId, allergies } = req.body;

    const existingPreferences = await Preferences.findOne({
      userEmail,
      userId,
    });

    if (existingPreferences) {
      existingPreferences.allergies = allergies;
      await existingPreferences.save();
      res.status(200).json({ message: "Data updated successfully" });
    } else {
      const preferences = new Preferences({
        userEmail,
        userId,
        allergies,
      });

      await preferences.save();

      res.status(200).json({ message: "Data stored successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error storing/updating data" });
  }
});

router.post("/cookPreference", async (req, res) => {
  try {
    const { userEmail, userId, cook } = req.body;
    const user = await Preferences.findOneAndUpdate(
      { userEmail, userId },
      { cook }
    );

    if (user) {
      res.status(200).json({ message: "Data is successfully updated" });
    } else {
      res.status(404).json({ error: "User not found!" }); // Corrected the response format
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error storing data" });
  }
});

router.post("/diet", async (req, res) => {
  try {
    const { userEmail, userId, diet } = req.body;
    const user = await Preferences.findOneAndUpdate(
      { userEmail, userId },
      { diet }
    );

    if (user) {
      res.status(200).json({ message: "Data is successfully updated" });
    } else {
      res.status(404).json("User not found!");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error storing data" });
  }
});

router.get("/detailedPreferences/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Preferences.findOne({ userId: id });

    if (user) {
      res.status(200).json({
        cook: user.cook,
        allergies: user.allergies,
        diet: user.diet,
      });
    } else {
      res.status(404).json({ error: "User not found!" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error storing data" });
  }
});

module.exports = router;
