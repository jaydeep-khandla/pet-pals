const { User, Pet } = require('../models');

class adminServices {
  async getAllUsers() {
    return await User.find();
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  async getAllPets() {
    return await Pet.find();
  }

  async deletePet(id) {
    return await Pet.findByIdAndDelete(id);
  }

  async getUserCount() {
    return await User.aggregate([
      {
        $group: {
          _id: "$userType",   // Group by the 'type' field
          count: { $sum: 1 } // Count the number of documents in each group
        }
      }
    ])
  }

  async getPetCount() {
    return await Pet.aggregate([
      {
        $group: {
          _id: "$pet_adoption_status",   // Group by the 'type' field
          count: { $sum: 1 } // Count the number of documents in each group
        }
      }
    ])
  }

  // async getAdoptionCount() {
  //   return await AdoptionApplication.countDocuments();
  // }

}

module.exports = new adminServices();