const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workData = new Schema(
  {
    chefId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    eventOrganizer: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    paid: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("work", workData);
