const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotSchema = new Schema(
  {
    title: { type: String },
    pictures: [String],
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    address: String,
    // search: { type: String, required: true },
    location: {
      type: { type: String, required: true },
      coordinates: { type: [Number], required: true }
    },
    _owner: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Spot = mongoose.model("Spot", spotSchema);
module.exports = Spot;
