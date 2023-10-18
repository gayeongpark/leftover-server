const jwt = require("jsonwebtoken");
const { Auth } = require("../models/auth.model.js"); // Replace with the correct import for your Auth model.

const authenticateUser = async (req, res, next) => {
  try {
    console.log(req.headers);
    const accessToken = req.header("Authorization");
    console.log(accessToken);

    if (!accessToken) {
      return res
        .status(402)
        .json({ error: "Access denied. No token provided." });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
      req.user = decoded;
      next();
    } catch (accessTokenError) {
      const refreshToken = req.header("refreshToken");

      if (!refreshToken) {
        return res
          .status(403)
          .json({ error: "Access token expired; refresh token is required." });
      }

      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

      const user = await Auth.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ error: "User not found or invalid." });
      }

      const newAccessToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "5m",
        }
      );

      res.set("Authorization", newAccessToken);

      req.user = decoded;
      next();
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(405).json({ error: "Invalid token." });
  }
};

module.exports = authenticateUser;
