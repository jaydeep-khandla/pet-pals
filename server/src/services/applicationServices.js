const { AdoptionApplication } = require("../models");

class ApplicationServices {
  async createAdoptionApplication(data) {
    return await AdoptionApplication.create(data);
  }

  async fetchAdoptionApplication(id) {
    return await AdoptionApplication.findById(id);
  }
}

module.exports = new ApplicationServices();
