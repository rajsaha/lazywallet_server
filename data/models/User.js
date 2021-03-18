import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcryptjs.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (password, callback) {
  return callback(null, bcryptjs.compareSync(password, this.password));
};

const User = mongoose.model("User", UserSchema);
export { User };
