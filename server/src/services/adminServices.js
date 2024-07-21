const User = require('../models/user');
const Pet = require('../models/pet');

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
    return await User.findByIdAndDelete(id);
  }

}

module.exports = new adminServices();