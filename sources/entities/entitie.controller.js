const Entitie = require("./entitie.model");

function createEntitie(entitie) {
  return new Entitie({
    ...entitie,
  }).save();
}

function getEntitieToOwner(user) {
  return Entitie.find({ user });
}

function getSimilarEntities(TipoInversion, id) {
  return Entitie.find({ TipoInversion, _id: { $ne: id } });
}

function getFilteredEntities(TipoInversion) {
  return Entitie.find({ TipoInversion });
}

function getSingleEntitie(id) {
  return Entitie.findById(id);
}

function getEntitie() {
  return Entitie.find();
}

function updateEntitie(entitieId, fields) {
  return Entitie.findByIdAndUpdate(entitieId, {
    ...fields,
  });
}
module.exports = {
  createEntitie,
  getEntitieToOwner,
  getEntitie,
  updateEntitie,
  getSingleEntitie,
  getSimilarEntities,
  getFilteredEntities,
};
