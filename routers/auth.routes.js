import { Router } from "express"; //importamos Router de express que nos ayuda a crear las rutas
import {
  register,
  login,
  logout,
  profile,
  admin,
} from "../controllers/auth.controllers.js"; //importamos las funciones de auth.controllers.js
import { authRequired } from "../middlewares/validenToken.js"; //importamos la funcion que hemos creado para validar el token
import { authAdminRequired } from "../middlewares/validenTokenAdmin.js"; //importamos el middleware que hemos creado para validar el token de admin
import { registerSchema, loginSchema } from "../schema/auth.schema.js"; //importamos los esquemas de validacion pero necesitamos el validador de esquemas
import { validateSchema } from "../middlewares/validatos.middleware.js"; //importamos el validador de esquemas

const router = Router(); //Instanciamos Router

router.get("/", (req, res) => {
  //creamos una ruta get para la raiz de nuestro servidor
  res.send("Hello World"); //enviamos un mensaje
});

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile); //Protegemos la ruta con el middleware que hemos creado
router.get("/admin", authAdminRequired, admin );

export default router; //Exportamos las rutas
