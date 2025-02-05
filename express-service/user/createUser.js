const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a db module to handle database operations

module.exports = async (req, res) => {
    const { name } = req.body.name;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    try {
        const query = 'INSERT INTO user (name) VALUES (?)';
        const params = [name];

        const [result] = await db.query(query, params);

        res.status(201).json({ message: 'Utilisateur créé avec succès', userId: result.insertId });
    } catch (error) {
        console.error('Erreur MySQL :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
