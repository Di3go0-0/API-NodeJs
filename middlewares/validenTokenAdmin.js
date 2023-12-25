import jwt from "jsonwebtoken"; //importamos la librería de jsonwebtoken porque necesitamos usarla para validar el token
import { TOKEN_SECRET } from "../config.js"; // importamos la clave secreta del token

export const authAdminRequired = (req, res, next) => {
  const { token } = req.cookies; //extraemos el token de las cookies

  if (!token) return res.status(401).json({ message: "Unauthorized" }); //si no hay token, devolvemos un error

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    //verificamos el token
    if (err) return res.status(403).json({ message: "Invalid token" }); //si hay un error, devolvemos un error

    const { role, username } = user;
    if (role !== "admin")
      return res.status(403).json({ message: "Invalid role" });
    console.log({
      role
    });
    next();
  });
};
