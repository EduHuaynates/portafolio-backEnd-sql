const Usuario = require("./user.model");

function createUser(user, hashedPassword) {
  console.log("usuario", user);
  return new Usuario({
    ...user,
    password: hashedPassword,
  }).save();
}

function userExists(username) {
  return new Promise((resolve, reject) => {
    Usuario.find()
      .or([{ username: username }])
      .then((usuarios) => {
        resolve(usuarios.length > 0);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getSingleUser({ username: username, email: email, id: id }) {
  if (username) {
    return getUserByQuery({ username: username });
  } else if (id) {
    return getUserByQuery({ _id: id });
  } else if (email) {
    return getUserByQuery({ email: email });
  } else {
    throw new Error(
      "Function GetSingleUser was called without a required parameter"
    );
  }
}

function updateUser(userId, fields) {
  return Usuario.findByIdAndUpdate(userId, {
    ...fields,
  });
}

async function getUserByQuery(query) {
  const user = await Usuario.findOne(query);
  return user;
}

module.exports = {
  createUser,
  userExists,
  getSingleUser,
  getUserByQuery,
  updateUser,
};
