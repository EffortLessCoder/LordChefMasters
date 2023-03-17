const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chef = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
     },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    mobile: {
        type: Number,
        required: true,
    },
    yearofexp: {
        type: Number,
        required: true,
    },
    company: {
      type: String,
      required: true,
  },
    summary : {
      type : String
    },
    hourly_rate: {
        type: Number,
        required: true,
      },
      total_package: {
        type: Number,
        required: true,
      },
      specifications: {
        type: Array,
        required: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chef", chef);
