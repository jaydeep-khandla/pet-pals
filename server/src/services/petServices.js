const { Pet } = require("../models");

class petServices {
  async createPet(pet) {
    return await Pet.create(pet);
  }

  async getPets() {
    return await Pet.find();
  }

  // async paginatedPets(page = 1, limit = 10, filter = {}, search = {}) {
  //   const skip = (page - 1) * limit;
  //   try {
  //     const results = await Pet.aggregate([
  //       { $match: filter }, // Apply filters
  //       {
  //         $facet: {
  //           paginatedResults: [{ $skip: skip }, { $limit: limit }],
  //           totalCount: [
  //             {
  //               $count: "count",
  //             },
  //           ],
  //         },
  //       },
  //     ]);

  //     const paginatedPets = results[0].paginatedResults;
  //     const totalCount = results[0].totalCount[0]
  //       ? results[0].totalCount[0].count
  //       : 0;
  //     const totalPages = Math.ceil(totalCount / limit);

  //     return { pets: paginatedPets, totalPages };
  //   } catch (error) {
  //     throw new Error("Error fetching paginated pets:", error);
  //   }
  // }

  async getPetByField(field) {
    return await Pet.findOne(field);
  }
}

module.exports = new petServices();
