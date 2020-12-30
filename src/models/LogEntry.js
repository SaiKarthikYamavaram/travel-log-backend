/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const { Schema } = mongoose;

// * Title - Text
// * Description -Text
// * Comments -Text
// * Rating - scale 1 to 10
// * Image - Text -URL
// * Start Date - DateTime
// * end Date - DateTime
// * Latitude - Number
// * Longitude -Number
// * CreatedAt - DateTime
// * UpdatedAt - DateTime
const requiredNumber = {
  type: Number,
  required: true,
};
// manual way
// const defaultRequiredDate = {
//   type: Date,
//   default: Date.now,
//   required: true,
// };

const logEntrySchema = new Schema(
  {
    title: { type: String, required: true }, // String is shorthand for {type: String}
    description: String,
    comments: String,
    rating: {
      type: Number,
      min: 1,
      max: 10,
      default: 1,
    },
    image: String,
    latitude: {
      ...requiredNumber,
      min: -90,
      max: 90,
    },
    longitude: {
      ...requiredNumber,
      min: -180,
      max: 180,
    },
    visitedDate: {
      type: Date,
      required: true,
    },
    // created_at: defaultRequiredDate,  manual way
    // updated_at: defaultRequiredDate, manual way
  },
  {
    timestamps: true,
  },
);
const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
