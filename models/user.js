const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Birthday: {
    type: Date,
  },
  FavoriteMovies: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    },
  ],
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let User = mongoose.model("User", userSchema);

module.exports = User;
