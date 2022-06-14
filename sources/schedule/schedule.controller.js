const Schedule = require("./schedule.model");
const Investment = require("../investment/invest.model");
const mongoose = require("mongoose");
const pool = require("../../db");
const format = require("pg-format");

async function getSchedule(investmentId) {
  const inversion_id = investmentId;
  const query = `
  SELECT
    cr.id,
    cr.inversion_id,
    cr.periodo,
    cr.capital_retornado,
    cr.interes_retornado,
    cr.cuota,
    cr.saldo,
    cr.estado,
    cr.fecha_pago
	FROM 	CRONOGRAMA cr
	WHERE cr.inversion_id = $1 
  ORDER BY fecha_pago ASC`;

  const result = await pool.query(query, [inversion_id]);
  return result.rows;
}

async function getUserSchedules(userId) {
  const usuario_id = userId;
  const query = ` 
  SELECT
    inv.inversion,
    inv.empresa,
    cr.id,
    cr.inversion_id,
    cr.periodo,
    cr.capital_retornado,
    cr.interes_retornado,
    cr.cuota,
    cr.saldo,
    cr.estado,
    cr.fecha_pago
	FROM 	INVERSION inv
	LEFT JOIN CRONOGRAMA cr ON inv.id = cr.inversion_id
	WHERE inv.usuario_id = $1 
  ORDER BY fecha_pago ASC`;

  const result = await pool.query(query, [usuario_id]);

  return result.rows;
}

async function createSchedule(investId, schedule) {
  const inversion_id = investId;
  const cronograma_values = schedule.map((sch) =>
    [inversion_id].concat(Object.values(sch))
  );

  const query = `
  INSERT INTO CRONOGRAMA
  ( inversion_id ,
    periodo,
    capital_retornado,
    interes_retornado,
    cuota,
    saldo,
    estado,
    fecha_pago
  ) VALUES %L
    RETURNING *
  `;

  const result = await pool.query(format(query, cronograma_values));
  return result.rows[0];
}

module.exports = { getSchedule, getUserSchedules, createSchedule };
