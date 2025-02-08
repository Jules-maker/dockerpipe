const db = require('../db'); // Assuming you have a db module to handle database operations

module.exports = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    try {
        const query = 'UPDATE recipe SET name = ? WHERE id = ?';
        const params = [name, id];

        const [result] = await db.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Recette non trouvé' });
        }

        res.status(200).json({ message: 'Recette mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur MySQL :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};