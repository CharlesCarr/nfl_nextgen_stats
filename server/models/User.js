const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  fav_players: [{ type: String }],
});

module.exports = mongoose.model("User", UserSchema);
