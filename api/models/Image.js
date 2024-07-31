const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: { type: String, required: true },
  imagePath: { type: String, required: true }, // This will store base64 data now
  comments: [{ type: String }],
});

module.exports = mongoose.model("Image", ImageSchema);
