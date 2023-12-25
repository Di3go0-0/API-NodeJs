import {TOKEN_SECRET} from '../config.js'
import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, //payload es el objeto que queremos guardar en el token en este caso el id del usuario
      TOKEN_SECRET, // TOKEN_SECRET es la clave secreta que usamos para firmar el token en este caso la que definimos en el archivo config.js
      {
        expiresIn: "1d",
      }, //el token expira en 1 dia
      (err, token) => {
        if (err) reject(err); //todo ha ido mal
        resolve(token); //devolvemos el token
      }
    ); //creamos el token
  });
}