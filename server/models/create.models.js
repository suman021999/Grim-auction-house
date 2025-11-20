import mongoose, { Schema } from "mongoose";

const createSchema = new Schema(
  {
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
    amountBid: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Historical",
        "Electronics",
        "Automobiles",
        "Real Estate",
        "Art",
        "Antiques",
        "Jewelry & Watches",
        "Books & Media",
      ],
    },
    height: {
      type: String,
      default: 0,
      min: 0,
    },
    width: {
      type:String,
      default: 0,
      min: 0,
    },
    length: {
      type: String,
      default: 0,
      min: 0,
    },
    weight: {
      type: String,
      default: 0,
      min: 0,
    },
    medium: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // URL from Cloudinary 
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

export const Create = mongoose.model("Create", createSchema);

