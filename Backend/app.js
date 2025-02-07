const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const connecttodb = require("./db/db.js");
const userRoutes = require("./routes/user.routes.js");
const captainRoutes = require("./routes/captain.routes.js");
const mapsRoutes = require("./routes/maps.routes.js");
const rideRoutes = require("./routes/ride.routes.js");
connecttodb();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);
app.use("/captain", captainRoutes);

app.use("/maps", mapsRoutes);
app.use("/ride", rideRoutes);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
