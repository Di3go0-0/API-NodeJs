import mongoos from "mongoose"; //Libreria que nos permitirá conectarnos a la base de datos de mongodb

export const connect = async () => {
  try {
    await mongoos.connect("mongodb://127.0.0.1:27017/Diegodb"); //Nuestra conección con la base de datos debe ser asincronica
    console.log(">>>>>>>>>Conected to mongodb"); //mensaje de comprobación de conección
  } catch (e) {
    console.log(e); //si hay un error en la conección lo mostramos
  }
};
