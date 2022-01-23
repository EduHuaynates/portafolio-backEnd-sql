const Project = require("./project.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

function createProject(project) {
  return new Project({
    ...project,
  }).save();
}

function getProject(entitie) {
  return Project.find({ entitie: entitie }).sort({ fecha: -1 });
}

function updateProject(projectId, fields) {
  return Project.findByIdAndUpdate(projectId, {
    ...fields,
  });
}

module.exports = {
  createProject,
  getProject,
  updateProject,
};
