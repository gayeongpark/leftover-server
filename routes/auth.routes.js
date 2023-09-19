const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/auth.model.js");

const router = express.Router();

router.post("/signup", async (req, res, next) => {});
router.post("/login", async (req, res, next) => {});
router.post("/logout", async (req, res, next) => {});

router.post("/forgotPassword", async (req, res, next) => {});

router.post("/resetPassword", async (req, res, next) => {});

module.exports = router;
