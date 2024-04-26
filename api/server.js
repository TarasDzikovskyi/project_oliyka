import express from 'express';
const app = express();
import {sequelize} from './database/index.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import router from './router.js';




dotenv.config();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));



async function db_connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection to DB successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

db_connect();

// const frontEndFolder = path.join('..', 'client');
// app.use(express.static(path.join(frontEndFolder, 'dist'), {redirect: false}));

app.use("/api", router);



// app.listen( process.env.PORT, process.env.HOST, () => {
//     console.log(`Server is running on port ${process.env.HOST}:${process.env.PORT}...`)
// });

app.listen( process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`)
});


