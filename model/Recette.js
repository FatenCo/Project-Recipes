const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;
const Joi = require("joi");
const jwt = require("jsonwebtoken");



const RecetteSchema = new Schema(
  {
    name: {
      type: String,
      min: [8, "name must be at least 8 characters long ..."],
      max: [50, "name must be at most 50 characters long ..."],
      require: [true, "name is required ..."],
    },
    ingredients: {
      type: String,
      min: [8, "ingredients must be at least 8 characters long ..."],
      max: [50, "ingredients must be at most 50 characters long ..."],
      require: [true, "ingredients is required ..."],
    },
    avatar: {
      type: String,
      require: [true, "Avatar is required ..."],
    },  
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Recette = mongoose.model("Recette", RecetteSchema);

RecetteValidate = (recette) => {
  const ValidateSchema = Joi.object({
    name: Joi.string().min(4).max(50),
    ingredients: Joi.string().min(8).max(255), 
    avatar: Joi.string(), 
    user: Joi.string(),
  });
  return ValidateSchema.validate(recette);
};

exports.Recette = Recette;
exports.RecetteValidate = RecetteValidate;
