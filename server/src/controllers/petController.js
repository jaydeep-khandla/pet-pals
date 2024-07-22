const petServices = require("../services/petServices");

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

    try {
        const pet = await petServices.getPetByField({ _id: req.params.id });
        res.status(200).json(pet);
    } catch (error) {
        console.error("getPet error: ", error);

        res.status(500).json({ error: error.message });
    }
}