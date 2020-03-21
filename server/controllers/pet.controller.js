const Pet = require("../models/pet.model");

module.exports = {
  create(req, res) {
    Pet.create(req.body)
      .then(pet => res.json(pet))
      .catch(err => res.status(400).json(err));
  },
  getAll(req, res) {
    Pet.find()
      .then(pet => res.json(pet))
      .catch(err => res.json(err));
  },
  getOne(req, res) {
    Pet.findById(req.params.id)
      .then(pet => res.json(pet))
      .catch(err => res.json(err));
  },
  delete(req, res) {
    Pet.findByIdAndDelete(req.params.id)
      .then(deletedPet => res.json(deletedPet))
      .catch(err => res.json(err));
  },
  update(req, res) {
    Pet.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true
    })
      .then(updatedPet => res.json(updatedPet))
      .catch(err => res.status(400).json(err));
  }
};
