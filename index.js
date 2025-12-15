// index.js CORRECT
import express from "express"; // <--- C'était 'require', maintenant c'est 'import'
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à la base de données
// (Note: le 'await' ici fonctionne uniquement si "type": "module" est activé)
const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ab227king",
  database: "commande_db",
});

// Route pour enregistrer une commande
app.post("/commande", async (req, res) => {
  const { nom, prenom, phone, addresse, email, plat } = req.body;
  console.log("REQ BODY =>", req.body);


  if (!nom || !prenom || !phone || !addresse || !email || !plat) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  try {
    const sql = `
      INSERT INTO commande (nom, prenom, phone, addresse, email,plat, date_commande)
      VALUES (?, ?, ?, ?, ?,?, NOW())
    `;
    await db.query(sql, [nom, prenom, phone, addresse, email, plat]);
    res.json({ success: true });
  } catch (err) {
    console.error("Erreur MySQL:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API commande sur http://localhost:${PORT}`);
});
