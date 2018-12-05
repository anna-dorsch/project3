const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotSchema = new Schema(
  {
    surfSpot: { type: Boolean, required: true, default: false },
    diveSpot: { type: Boolean, required: true, default: false },
    title: { type: String },
    pictures: [String],
    pictureUrl: String,
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    address: String,
    tag: [],
    location: {
      type: { type: String, required: true },
      coordinates: { type: [Number], required: true }
    },
    _owner: { type: Schema.Types.ObjectId, ref: "User" },
    // pictureUrl: String,
    public_id: String
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
