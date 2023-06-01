const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi =require ("joi");
const jwt = require("jsonwebtoken");



// schema of user registered with mongoose 

const UserSchema = new Schema({ 
  email: {
    type: String,
    unique: true,
    min: [8, "email must be at least 8 characters long ..."],
    max: [255, "email must be at most 255 characters long ..."],
    require: [true, "email is required ..."],
  },
  password: {
    type: String,
    min: [8, "password must be at least 8 characters long ..."],
    max: [255, "password must be at most 255 characters long ..."],
    require: [true, "password is required ..."],
  }, 
});

UserSchema.methods.getToken = function () {
  const token = jwt.sign(
    { _id: this.id, isAdmin: this.isAdmin },
    "privateKey",
    { expiresIn: "1h" }
  );
  return token;
};


const User = mongoose.model("User", UserSchema);

UserValidate=(user)=>{
    const ValidateSchema = Joi.object({ 
        email: Joi.string().min(8).max(255).email(),
        password: Joi.string().min(8).max(255), 
    });
return ValidateSchema.validate(user);
}

LoginUser=(user)=>{
    const LoginSchema = Joi.object({
        email : Joi.string().min(8).max(255).required().email(),
        password :Joi.string().min(8).max(255).required(),
    });
    return LoginSchema.validate(user);
}

exports.User = User;
exports.UserValidate = UserValidate;
exports.LoginUser = LoginUser;


 