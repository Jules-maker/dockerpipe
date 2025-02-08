const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./db');
const recipe = require('./recipe');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
const port = process.env.PORT;


app.use(bodyParser.json());

app.use(cors(
    {
        origin: '*', // Autoriser toutes les requêtes
    }  
));




app.get('/', (req, res) => {
  res.send('Hello World app!');
});
app.get('/ping', (req, res) => {
    res.send('pong app');
    });

app.use('/recipe', recipe);



// Route pour ajouter un utilisateur
// app.post('/user', async (req, res) => {
//     const { name } = req.body.name; // Récupération du nom depuis le JSON envoyé
  
//     if (!name) {
//       return res.status(400).json({ error: 'Le nom est requis' });
//     }
  
//     try {
//       const [result] = await db.query('INSERT INTO user (name) VALUES (?)', [name]);
//       res.status(201).json({ message: 'Utilisateur ajouté', id: result.insertId });
//     } catch (error) {
//       console.error('Erreur MySQL :', error);
//       res.status(500).json({ error: 'Erreur serveur' });
//     }
//   });

// // Route pour supprimer un utilisateur
// app.delete('/user/:id', async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       const [result] = await db.query('DELETE FROM user WHERE id = ?', [id]);
  
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ error: 'Utilisateur non trouvé' });
//       }
  
//       res.json({ message: 'Utilisateur supprimé' });
//     } catch (error) {
//       console.error('Erreur MySQL :', error);
//       res.status(500).json({ error: 'Erreur serveur' });
//     }
//   });



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});