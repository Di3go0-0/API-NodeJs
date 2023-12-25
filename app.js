import express from 'express';  //framework para crear el servidor
import morgan from 'morgan';    //middleware para ver las peticiones que llegan al servidor
import UserRoutes from './routers/auth.routes.js'; //importamos las rutas de auth.routes.js
import cookieParser from 'cookie-parser'; //importamos cookie-parser para poder usar las cookies    
import path from 'path';
const app = express(); //instanciamos Express

app.use(morgan('dev')); //usamos morgan con el parametro dev para ver las peticiones en consola
app.use(express.json()); //usamos express para poder recibir y enviar archivos json
app.use(cookieParser()); //usamos cookie-parser para poder usar las cookies


app.use("/api", UserRoutes); //usamos las rutas de auth.routes.js
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), './routers/routers.json'));
});

export default app; //exportamos app
