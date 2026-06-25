import express from 'express';
import connectDB from './config/db.js';
import router from './router.js';

const app = express();

const run = async () => {

    try {
        
        await connectDB();

        app.use(express.json());

        const port = process.env.PORT || 4000;

        app.use('/api', router);

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {
        console.log(`Error al iniciar la app: ${error}`);
    }

}

run();