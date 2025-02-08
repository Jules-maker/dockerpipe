const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a db module to handle database operations

module.exports = async (req, res) => {
  const  id  = req.query.id;

  try {
    let query = 'SELECT * FROM recipe';
    let params = [];

    if (id) {
      query += ' WHERE id = ?';
      params.push(id);
    }

    const [rows] = await db.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Recette non trouvé' });
    }

    res.json(id ? rows[0] : rows);
  } catch (error) {
    console.error('Erreur MySQL :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
