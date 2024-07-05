const User = require('../models/user');

class UserService {
  async createUser(user) {
    return await User.create(user);
  }

  async getAllUsers() {
    return await User.find();
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async updateUser(id, user) {
    return await User.findByIdAndUpdate(id, user);
  }

  async deleteUser(id) {
    return await User.deleteOne(id);
  }
}

module.exports = new UserService();