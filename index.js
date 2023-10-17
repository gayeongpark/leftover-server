const express = require("express");
// const cors = require("cors");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB;
mongoose
  .set("strictQuery", false)
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to MongoDB! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 8000;



app.listen(PORT, () => {
  console.log(`Server listening on the port http://localhost:${PORT}`);
});

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const preferencesRoutes = require("./routes/preferences.routes");
app.use("/preferences", preferencesRoutes);
