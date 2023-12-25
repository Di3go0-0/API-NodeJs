import app from "./app.js"; //importamos app de app.js
import { connect } from "./db.js"; //importamos la función connect de db.js de la base de datos

connect(); //nos conectamos con la base de datos

const PORT = process.env.PORT || 3001; //definimos que el puerto será el 3001 o el que nos de el servidor

app.listen(
  PORT,
  () => console.log(`>>>>>>>>>Server on port ${PORT}`) //mensaje de comprobación de conección
);
