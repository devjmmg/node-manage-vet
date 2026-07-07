import express from 'express';
import connectDB from './config/db.js';
import router from './router.js';
import cors from 'cors';

const app = express();

const run = async () => {

    try {
        
        await connectDB();

        const allowedDomains = [
            process.env.FRONTEND_URL
        ];
        const corsOptions = {
            origin: function(origin, callback) {
                if (allowedDomains.indexOf(origin) !== -1) {
                    // El origen del request esta permitido
                    callback(null, true);
                } else {
                    callback('Error')
                }
            }
        }
        app.use(cors(corsOptions));

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