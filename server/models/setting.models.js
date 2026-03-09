//seting.models.js

import mongoose, { Schema } from "mongoose";

const settingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },

    profileVisibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },

    dataSharing: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Setting = mongoose.model("Setting", settingSchema);
