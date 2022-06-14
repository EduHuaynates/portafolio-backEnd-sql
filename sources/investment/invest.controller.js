const Investment = require("./invest.model");
const Schedule = require("../schedule/schedule.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const pool = require("../../db");

// function createInvest(invest) {
//   return new Investment({
//     ...invest,
//   }).save();
// }

async function createInvest(investment) {
  const invest_values = Object.values(investment);
  const query = `INSERT INTO INVERSION (usuario_id,
    fecha_inicio,
    empresa,
    inversion,
    retorno_interes,
    retorno_capital,
    tasa_porcentaje,
    periodo_inversion,
    capital
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;

  const result = await pool.query(query, invest_values);
  return result.rows[0];
}

// function getInvest(userid) {
//   return Investment.find({ user: userid }).sort({ fecha: -1 });
// }

async function getInvest(userid) {
  const usuario_id = userid;
  const query = `SELECT 
    id,
    usuario_id,
    fecha_inicio,
    empresa,
    inversion,
    retorno_interes,
    retorno_capital,
    tasa_porcentaje,
    periodo_inversion,
    capital
  FROM INVERSION WHERE usuario_id = $1
  `;

  const result = await pool.query(query, [usuario_id]);
  return result.rows;
}

function updateInvest(investId, fields) {
  return Investment.findByIdAndUpdate(investId, {
    ...fields,
  });
}

async function getCapitalPerUser(userid) {
  const usuario_id = userid;
  const query = ` SELECT
                    empresa,
                    SUM(capital) as CapitalTotal
                  FROM INVERSION
                  WHERE usuario_id = $1
                  GROUP BY empresa`;
  const result = await pool.query(query, [usuario_id]);
  return result.rows;
}

async function getUserInterest(userid) {
  const usuario_id = userid;
  const query = `SELECT
	                SUM(cr.interes_retornado) interes
	              FROM CRONOGRAMA cr
                INNER JOIN INVERSION inv ON  cr.inversion_id = inv.id
	              WHERE inv.usuario_id = $1`;

  const result = await pool.query(query, [usuario_id]);
  return result.rows;
}

async function deleteInvest(investId) {
  const inversion_id = investId;
  const query = ` DELETE
                  FROM INVERSION
                  WHERE id = $1`;
  const result = await pool.query(query, [inversion_id]);
  return result.rows;
}

module.exports = {
  createInvest,
  getInvest,
  updateInvest,
  getCapitalPerUser,
  deleteInvest,
  getUserInterest,
};
