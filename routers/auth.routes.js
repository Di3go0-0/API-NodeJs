import { Router } from "express"; //importamos Router de express que nos ayuda a crear las rutas
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controllers.js"; //importamos las funciones de auth.controllers.js
import { authRequired } from "../middlewares/validenToken.js"; //importamos la funcion que hemos creado para validar el token

const router = Router(); //Instanciamos Router

router.get("/", (req, res) => {
  //creamos una ruta get para la raiz de nuestro servidor
  res.send("Hello World"); //enviamos un mensaje
});

router.post("/register", register)
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile",authRequired, profile); //Protegemos la ruta con el middleware que hemos creado

export default router; //Exportamos las rutas
