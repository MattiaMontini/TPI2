const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3080;
const persone = [];

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/utente', (req, res) => {
    const {nome, cognome, data, sesso, skills} = req.body;
    if (!nome || !cognome || !data || !sesso || !skills) {
        return res.status(400).json({
            error: "Dati mancanti"
        });
    }
    persone.push({ nome, cognome, data, sesso, skills });
    res.json({
        message: "Dati salvati con successo!",
        data: persone
    });
});

app.get('/utente', (req, res) => {
    res.json(persone);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
