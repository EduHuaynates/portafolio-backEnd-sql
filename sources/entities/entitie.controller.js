const Entitie = require("./entitie.model");

function createEntitie(entitie) {
  return new Entitie({
    ...entitie,
  }).save();
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
};
