const express = require("express");
// const cors = require("cors");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

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

const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 8000;

// const allowedOrigins = ["exp://192.168.0.157:8081", ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.listen(PORT, () => {
  console.log(`Server listening on the port http://localhost:${PORT}`);
});

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
