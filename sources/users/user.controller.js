const Usuario = require("./user.model");
const pool = require("../../db");

async function createUser(user, hashedPassword) {
  const { username } = user;
  const result = await pool.query(
    "INSERT INTO USUARIOS (username,password) VALUES ( $1,$2)",
    [username, hashedPassword]
  );

  if (result.rows.length > 0) {
    return result.rows[0].username;
  } else {
    return username;
  }
}

function userExists(username) {
  return getUserByQuery(username);
}

function getSingleUser({ username: username }) {
  if (username) {
    return getUserByQuery(username);
  } else {
    throw new Error(
      "Function GetSingleUser was called without a required parameter"
    );
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

async function updateUser(userId, fields) {
  const { username, active } = fields;
  const query = ` UPDATE USUARIOS
                  SET username = $1 ,
                      active = $2
                  WHERE id = $3 RETURNING id, username`;
  const result = await pool.query(query, [username, active, userId]);
  console.log(result, "result.rows[]");
  return result.rows[0];
}

async function getUserByQuery(parameter) {
  const query = ` SELECT id , 
                         username , 
                         password 
                  FROM USUARIOS 
                  WHERE username = $1`;

  const result = await pool.query(query, [parameter]);

  return result.rows[0];
}

async function getUserByQueryId(parameter) {
  const query = ` SELECT id , 
                         username , 
                         password 
                  FROM USUARIOS 
                  WHERE id = $1`;

  const result = await pool.query(query, [parameter]);

  return result.rows[0];
}

module.exports = {
  createUser,
  userExists,
  getSingleUser,
  getUserByQuery,
  updateUser,
  getSingleUserById,
};
