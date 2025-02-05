const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a db module to handle database operations

module.exports = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID utilisateur requis' });
    }

    try {
        const query = 'DELETE FROM user WHERE id = ?';
        const params = [id];

        const [result] = await db.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur MySQL :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
