// models/bid.model.js
import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Create",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    bidStatus: {
      type: String,
      enum: ["Winning", "Outbid"],
      default: "Winning",
    },
  },
  { timestamps: true }
);

export const Bid = mongoose.model("Bid", bidSchema);
