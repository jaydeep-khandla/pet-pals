const { User, Pet } = require('../models');

class UserService {
  async createUser(user) {
    return await User.create(user);
  }

  async getUserByField(field, projection = null) {
    if (projection === null) return await User.findOne(field).populate('pets_ids').exec();
    
    return await User.findOne(field).select(projection).populate('pets_ids').exec();
  }

  async getUsersByField(field, projection = null) {
    if (projection === null) return await User.find(field);
    
    return await User.find(field).select(projection);
  }

  async getUsersByIds(ids, projection = null) {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('Invalid IDs array');
    }

    if (projection === null) {
      return await User.find({ _id: { $in: ids } });
    }

    return await User.find({ _id: { $in: ids } }).select(projection);
  }

  async updateUserByField(filter, update) {
    return await User.findOneAndUpdate(filter, update, { new: true });
  }

  async deleteUser(id) {
    return await User.deleteOne(id);
  }
}

module.exports = new UserService();