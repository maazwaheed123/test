const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const imageRoutes = require("./routes/images");
const app = express();

// Middleware
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(bodyParser.json());
app.use(cors());

app.use("/api/images", imageRoutes);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://maazwaheed:1234@cluster0.kdph31d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err, "sss"));

app.use(express.static(path.join(process.cwd(), "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
