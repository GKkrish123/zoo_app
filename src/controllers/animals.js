const { AddAnimalSchema, EditAnimalSchema } = require("../db/schema");
const db = require("../db/connection");

const getAnimals = async (req, res, next) => {
  try {
    let queryObject = {};
    const searchQuery = req.query.search;
    if (req.query.search) {
      const searchInput = {
        $regex: searchQuery,
        $options: "i",
      };
      queryObject = {
        $or: [
          {
            name: searchInput,
          },
          {
            age:
              !isNaN(searchQuery) && !isNaN(parseFloat(searchQuery))
                ? parseInt(searchQuery)
                : searchInput,
          },
          {
            species: searchInput,
          },
          {
            gender: searchInput,
          },
          {
            section_id: searchInput,
          },
        ],
      };
    }
    const animals = db.get("animals");
    const animalsList = await animals.find(queryObject);
    res.json(animalsList);
  } catch (error) {
    next(error);
  }
};

const addAnimal = async (req, res, next) => {
  try {
    const requestBody = req.body;
    const validatedRequestBody = await AddAnimalSchema.validateAsync(
      requestBody
    );

    const animals = db.get("animals");
    const animalExists = await animals.findOne({
      name: { $eq: validatedRequestBody.name, $options: "i" },
    });

    if (animalExists) {
      const error = new Error("Animal with same name already exists");
      res.status(409);
      return next(error);
    }

    const newAnimal = await animals.insert(validatedRequestBody);

    res.json(newAnimal);
  } catch (error) {
    next(error);
  }
};

const editAnimal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requestBody = req.body;
    const validatedRequestBody = await EditAnimalSchema.validateAsync(
      requestBody
    );

    const animals = db.get("animals");
    const animalToEdit = await animals.findOne({
      _id: id,
    });

    if (!animalToEdit) {
      const error = new Error("Animal Not Exists");
      res.status(409);
      return next(error);
    }

    const animalExists = await animals.findOne({
      name: { $eq: validatedRequestBody.name, $options: "i" },
      _id: { $ne: id },
    });

    if (animalExists) {
      const error = new Error("Animal with same name already exists");
      res.status(409);
      return next(error);
    }

    const updatedAnimal = await animals.update(
      {
        _id: id,
      },
      { $set: validatedRequestBody },
      { upsert: true }
    );

    res.json(updatedAnimal);
  } catch (error) {
    next(error);
  }
};

const deleteAnimal = async (req, res, next) => {
  try {
    const { id } = req.params;

    const animals = db.get("animals");
    const animalToDelete = await animals.findOne({
      _id: id,
    });

    if (!animalToDelete) {
      const error = new Error("Animal Not Exists");
      res.status(409);
      return next(error);
    }

    await animals.remove({
      _id: id,
    });

    res.json({
      message: "Animal has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnimals,
  addAnimal,
  editAnimal,
  deleteAnimal,
};
