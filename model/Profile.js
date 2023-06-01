const mongoose = require("mongoose");
const mongooseTypePhone = require("mongoose-type-phone");
const Schema = mongoose.Schema;
const Joi = require("joi");
const jwt = require("jsonwebtoken"); 

// schema of user registered with mongoose

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      min: [8, "name must be at least 8 characters long ..."],
      max: [50, "name must be at most 50 characters long ..."],
      require: [true, "name is required ..."],
    },
    lastname: {
      type: String,
      min: [8, "lastname must be at least 8 characters long ..."],
      max: [50, "lastname must be at most 50 characters long ..."],
      require: [true, "lastname is required ..."],
    },
    avatar: {
      type: String,
      require: [true, "Avatar is required ..."],
    },
    age: {
      type: Number,
      require: [true, "age is required ..."],
    },
    phone: {
      type: mongoose.SchemaTypes.Phone,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps:true,
    }
);

 

const Profile = mongoose.model("Profile", ProfileSchema);

ProfileValidate = (profile) => {
  const ValidateSchema = Joi.object({
    name: Joi.string().min(4).max(50),
    lastname: Joi.string().min(8).max(255),
    age: Joi.number(),
    avatar: Joi.string(),
    phone: Joi.string(),
    account: Joi.string(),
  });
  return ValidateSchema.validate(profile);
};

exports.Profile = Profile;
exports.ProfileValidate = ProfileValidate; 
