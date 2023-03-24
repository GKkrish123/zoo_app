const Joi = require("joi");

const AddAnimalSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  species: Joi.string().min(3).max(30).required(),
  age: Joi.number().min(1).max(1000).required(),
  gender: Joi.string().min(3).max(30).required(),
  section_id: Joi.string().min(3).max(30).required(),
});

const EditAnimalSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  species: Joi.string().min(3).max(30),
  age: Joi.number().min(1).max(1000),
  gender: Joi.string().min(3).max(30),
  section_id: Joi.string().min(3).max(30),
});

module.exports = {
  AddAnimalSchema,
  EditAnimalSchema,
};
