export const validateSchema = (schema) => (req, res, next) => {
  //creamos una funcion que recibe un esquema y devuelve un middleware
  try {
    schema.parse(req.body); //vemos si el esquema es valido con el body de la peticion
    next(); //continuamos si es valido
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.errors.map((error) => error.message) }); //si no devolvemos el error
  }
};
