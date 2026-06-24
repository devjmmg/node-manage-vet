import express from 'express';
import connectDB from './config/db.js';

const app = express();

const run = async () => {

    try {
        
        await connectDB();

        const port = process.env.PORT || 4000;

        app.get('/', (req, res) => {
            res.send('Hola mundo');
        });

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {
        console.log(`Error al iniciar la app: ${error}`);
    }

}

run();