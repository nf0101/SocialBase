import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Variabile per tracciare la connessione
let isDbConnected = false;

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ Connessione a MongoDB riuscita');
        isDbConnected = true;
    })
    .catch(err => {
        console.error('❌ Errore nella connessione a MongoDB:', err);
        isDbConnected = false;
    });

// Endpoint API per controllare stato connessione
app.get('/api/db-status', (req, res) => {
    if (isDbConnected) {
        res.json({ message: '✅ Database connesso correttamente!' });
    } else {
        res.status(500).json({ message: '❌ Errore nella connessione al database' });
    }
});

export default app;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server in ascolto sulla porta ${PORT}`);
});
