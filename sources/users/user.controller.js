const User = require("./user.model");
// const sequelize = require("../../connection");

function createUser(user, hashedPassword) {
  // const { username } = user;
  // const result = await pool.query(
  //   "INSERT INTO USUARIOS (username,password) VALUES ( $1,$2)",
  //   [username, hashedPassword]
  // );

  // if (result.rows.length > 0) {
  //   return result.rows[0].username;
  // } else {
  //   return username;
  // }
  console.log("entro en el controller");
  const newUser = User.create({
    username: user.username,
    password: hashedPassword,
    email: user.email,
  }); //.then((us) => console.log(us, "us"));
  console.log(newUser, "salio en el controller");

  return newUser;
}

function userExists(username) {
  // return new Promise((resolve, reject) => {
  //   resolve(false);
  // });
  return getUserByQuery(username);
}

function getSingleUser({ username: username }) {
  // if (username) {
  //   return getUserByQuery(username);
  // } else {
  //   throw new Error(
  //     "Function GetSingleUser was called without a required parameter"
  //   );
  // }
  if (username) {
    return User.findAll({
      raw: true,
      // attributes: ["username","password","email",],
    });
  }
}

function getSingleUserById({ id: id }) {
  if (id) {
    return getUserByQueryId(id);
  } else {
    throw new Error(
      "Function GetSingleUser was called without a required parameter"
    );
  }
}

function updateUser(userId, fields) {
  // const { username, active } = fields;
  // const query = ` UPDATE USUARIOS
  //                 SET username = $1 ,
  //                     active = $2
  //                 WHERE id = $3 RETURNING id, username`;
  // const result = await pool.query(query, [username, active, userId]);
  // console.log(result, "result.rows[]");
  // return result.rows[0];

  const userUpdated = User.update(fields, {
    where: {
      id: userId,
    },
  });

  return userUpdated;
}

function getUserByQuery(filter) {
  const users = User.findAll({
    attributes: ["username", "email"],
    where: {
      username: filter,
    },
  });
  console.log(users, "users get user");
  return users;
  // const query = ` SELECT id ,
  //                        username ,
  //                        password
  //                 FROM USUARIOS
  //                 WHERE username = $1`;
  // const result = await pool.query(query, [parameter]);
  // return result.rows[0];
}

async function getUserByQueryId(parameter) {
  // const query = ` SELECT id ,
  //                        username ,
  //                        password
  //                 FROM USUARIOS
  //                 WHERE id = $1`;
  // const result = await pool.query(query, [parameter]);
  // return result.rows[0];
}

module.exports = {
  createUser,
  userExists,
  getSingleUser,
  getUserByQuery,
  updateUser,
  getSingleUserById,
};
