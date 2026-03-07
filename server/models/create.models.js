import mongoose, { Schema } from "mongoose";

const createSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    time: {
      type: String,
      required: true,
    },

    // 🔥 Starting price
    amountBid: {
      type: Number,
      required: true,
      min: 0,
    },

    currentBid: {
      type: Number,
      default: function () {
        return this.amountBid;
      },
    },

    highestBidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    adminStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    auctionStatus: {
      type: String,
      enum: ["Active", "Ended"],
      default: "Active",
    },
    // 🔥 NEW FIELDS FOR ITEM DETAILS
    height: {
      type: Number,
      default: 0,
    },

    width: {
      type: Number,
      default: 0,
    },

    length: {
      type: Number,
      default: 0,
    },

    weight: {
      type: Number,
      default: 0,
    },

    medium: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Create = mongoose.model("Create", createSchema);
