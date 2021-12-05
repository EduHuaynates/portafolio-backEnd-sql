const Entitie = require("./entitie.model");

function createEntitie(entitie) {
  return new Entitie({
    ...entitie,
  }).save();
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
  getEntitie,
  updateEntitie,
  getSingleEntitie,
  getSimilarEntities,
  getFilteredEntities,
};
