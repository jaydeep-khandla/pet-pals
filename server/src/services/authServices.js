const User = require('../models/user');

class UserService {
  async createUser(user) {
    return await User.create(user);
  }

  async getAllUsers() {
    return await User.find();
  }

  async getUserByField(field) {
    return await User.findOne(field);
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async updateUserByField(filter, update) {
    return await User.findOneAndUpdate(filter, update);
  }

  async deleteUser(id) {
    return await User.deleteOne(id);
  }
}

module.exports = new UserService();