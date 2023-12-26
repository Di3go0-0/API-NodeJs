import jwt from "jsonwebtoken"; //importamos la librería de jsonwebtoken porque necesitamos usarla para validar el token
import { TOKEN_SECRET } from "../config.js"; // importamos la clave secreta del token

export const authAdminRequired = (req, res, next) => {
  const {token} = req.cookies;
  
  if (!token) return res.status(401).json({ message: "You need to log in first" }); //si no hay token, devolvemos un error


  const { tokenRole } = req.cookies; //extraemos el token de las cookies

  if (!tokenRole) return res.status(401).json({ message: "You need be a admin" }); //si no hay token, devolvemos un error

  jwt.verify(tokenRole, TOKEN_SECRET, (err, user) => {
    //verificamos el token
    if (err) return res.status(403).json({ message: "Invalid token" }); //si hay un error, devolvemos un error

    const { role } = user;
    if (role !== "admin")
      return res.status(403).json({ message: "You need be a admin" }); //si hay un error, devolvemos un error
    console.log({
      role,
    });
    next();
  });
};
