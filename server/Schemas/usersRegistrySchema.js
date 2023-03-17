const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userRegistry = new Schema(
  {
    profile : {
      type : String,
      required : true
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim : true,
      unique : true
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim : true
    },
    mobile: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userRegistry);


/**
 * 
 * 
 * fname: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    paid: {
      type: Number,
      required: true,
    },
    chef_details: {
      type: String,
      required: true,
    },
 */