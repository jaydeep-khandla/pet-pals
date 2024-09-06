const {
  AdoptionApplication,
  RehomeApplication,
  FuneralApplication,
} = require("../models");

class ApplicationServices {
  async createAdoptionApplication(data) {
    return await AdoptionApplication.create(data);
  }

  async fetchAdoptionApplication(id) {
    return await AdoptionApplication.findById(id);
  }

  async fetchAdoptionApplications() {
    return await AdoptionApplication.find();
  }

  async createRehomeApplication(data) {
    return await RehomeApplication.create(data);
  }

  async fetchRehomeApplication(id) {
    return await RehomeApplication.findById(id);
  }

  async fetchRehomeApplications() {
    return await RehomeApplication.find();
  }

  async createFuneralApplication(data) {
    return await FuneralApplication.create(data);
  }

  async fetchFuneralApplication(id) {
    return await FuneralApplication.findById(id);
  }

  async fetchFuneralApplications() {
    return await FuneralApplication.find();
  }
}

module.exports = new ApplicationServices();
