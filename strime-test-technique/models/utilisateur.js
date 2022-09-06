const mongoose = require("mongoose")

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
)

module.exports =  mongoose.model("user", user)
