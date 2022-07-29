import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv/config'


const app = express();

//Get Current Year and Name Web Site
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nameSite = "Agencia de Viajes";
    next();
});

//Connect to Data Base
db.authenticate()
    .then(() => console.log(`Data Base ${process.env.DB_NAME} is connected`))
    .catch(error => console.log(error))

//Port
const PORT = process.env.PORT || 4000;

//Add body parse to read form data 
app.use(express.urlencoded({ extended: true }));

//Add router
app.use('/', router);

//Enable Pug
app.set('view engine', 'pug');

//Public Folder
app.use(express.static('public'));


//Server execution
app.listen(PORT, () => {
    console.log(`Server linstening on PORT ${PORT}.\nhttp://localhost:${PORT}/`);
});