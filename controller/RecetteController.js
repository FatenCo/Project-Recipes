const Joi = require("joi");
const { Recette, RecetteValidate } = require("../model/Recette");

 

exports.getRecette = async (req, res, next) => {
  try {
    let recettes = await Recette.find().populate(
      "user",
      "email  _id"
    ); 

    res.status(200).send(recettes);

  } catch (error) {
    res.status(400).send({ res: error, status: 400 });
  }
}; 


exports.showRecette = async (req, res, next) => {
  try {
    let recette = await Recette.findOne({ user: req.user._id }).populate(
      "user",
      "email  _id"
    );

    !recette && res.status(404).send("recette not found ... !");

    res.status(200).send(recette);
  } catch (error) {
    res.status(400).send({ res: error, status: 400 });
  }
};

 

exports.addRecette = async (req, res, next) => {
  const { error } = RecetteValidate(req.body);
  let { body, file } = req;
  let path = "http://localhost:5000/" + file.path.split("Uploads\\")[1];

  if (error) {
    return res.send(error.details[0].message);
  }

  try {
    let recette = new Recette({
      name: body.name,
      ingredients: body.ingredients, 
      user: body.user,
      avatar: path,
    });
    await recette.save();
    res.status(200).send(recette);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

 
exports.updateRecette = async (req, res, next) => { 
  const { error } = RecetteValidate(req.body);
  let { body, file, user } = req;
  let path = "http://localhost:5000/" + file.path.split("Uploads\\")[1];

  if (error) {
    return res.send(error.details[0].message);
  }

  try {
    let recette = await Recette.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: body.name,
        ingredients: body.ingredients,
        user: body.user,
        avatar: path,
      },
      {
        new: true,
      }
    );
    res.status(200).send(recette);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

 

exports.deleteRecette = (req, res, next) => {
  Recette.findByIdAndDelete({ _id: req.params.id })
    .then((recette) =>
      res
        .status(200)
        .send({ recette: recette, status: 200, message: "Success" })
    )
    .catch((err) => res.status(404).send({ error: err.message, status: 404 }));
};
