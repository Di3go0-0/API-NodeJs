import jwt from "jsonwebtoken"; //importamos la librería de jsonwebtoken porque necesitamos usarla para validar el token
import { TOKEN_SECRET } from "../config.js"; // importamos la clave secreta del token

export const authRequired = (req, res, next) => {
  const { token } = req.cookies; //extraemos el token de las cookies

  if (!token) return res.status(401).json({ message: "Unauthorized" }); //si no hay token, devolvemos un error

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    //verificamos el token
    if (err) return res.status(403).json({ message: "Invalid token" }); //si hay un error, devolvemos un error

    // console.log(user); //si no hay error, imprimimos el usuario que nos devuelve el token
    req.user = user; //guardamos el usuario en req.user
    next(); //llamamos a next para que continue con la siguiente función
  });
};
