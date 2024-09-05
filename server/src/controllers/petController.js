const petServices = require("../services/petServices");
const userServices = require("../services/userServices");
const { validateId } = require("../validation/validation");

exports.createPet = async (req, res) => {
  try {
    console.log("req.body: ", req.body);

    const pet = await petServices.createPet(req.body);

    console.log(pet);

    const { _id: petId, pet_organization_id: userId } = pet;

    if (userId) {
      try {
        await userServices.updateUserByField(
          { _id: userId },
          { $push: { pets_ids: petId } }
        );
      } catch (error) {
        console.error("createPet error: ", error);

        res.status(500).json({ error: error.message });
      }
    }

    res.status(201).json({ message: "Pet created", pet });
  } catch (error) {
    console.error("createPet error: ", error);

    res.status(500).json({ error: error.message });
  }
};

exports.getPets = async (_req, res) => {
  try {
    const pets = await petServices.getPets();
    res.status(200).json(pets);
  } catch (error) {
    console.error("getPets error: ", error);
    res.status(500).json({ error: error.message });
  }
};

// exports.getPets = async (req, res) => {

//     if (!req.query) {
//         return res.status(400).json({ error: "Query params are required" });
//     }

//     try {
//         const { page, limit, filter, sort } = req.query;
//         const pets = await petServices.paginatedPets(page, limit, filter, sort);
//         res.status(200).json(pets);
//     } catch (error) {
//         console.error("getPets error: ", error);

//         res.status(500).json({ error: error.message });
//     }
// };

exports.getPet = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Pet id is required" });
  }

  const error = validateId(req.params.id);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const pet = await petServices.getPetByField({ _id: req.params.id });
    res.status(200).json(pet);
  } catch (error) {
    console.error("getPet error: ", error);

    res.status(500).json({ error: error.message });
  }
};
