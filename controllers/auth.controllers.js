import User from "../models/user.model.js"; //modelo de usuario que nos sirve para crear nuevos usuarios
import bcrypt from "bcryptjs"; //libreria que nos ayuda a encriptar las contraseñas
import { createAccessToken } from "../libs/jwt.js"; //importamos la funcion que hemos creado para crear el token

export const register = async (req, res) => {
  const {username, email, password, role } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    //para crear un nuevo usuario debemos tener un modelo de usuario (en este caso es User)
    const newUser = new User({
      username,
      email,
      password: passwordHash, //le decimos que la contraseña es nuestra contraseña encriptada
      role,
    });
    const userSaved = await newUser.save(); //guardamos el nuevo usuario en la base de datos
    const token = await createAccessToken({ id: userSaved._id }); //creamos el token de la id
    const tokenRole = await createAccessToken({ role: userSaved.role}); //creamos el token de la id
    //envia una cookie con el token y el tokenROle
    res.cookie("token", token);
    res.cookie("tokenRole", tokenRole);

    res.status(201).json({
      _id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  const {email, password, role} = req.body;
  try {
    const userFound = await User.findOne({ email }); //buscamos el usuario en la base de datos

    if (!userFound) res.status(400).json({ message: "User not found" }); //si el usuario no está en la base de datos, devolvemos un error

    const isMatch = await bcrypt.compare(password, userFound.password); //comparamos la contraseña que tenemos con la que nos ingresa

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" }); //si la contraseña no es correcta, devolvemos un error

    const token = await createAccessToken({id: userFound._id})  //creamos el token del usuario registrado
    const tokenRole = await createAccessToken({role: userFound.role})  //creamos el token del usuario registrado

    res.cookie("token", token);   //guardamos el token en una cookie y lo enviamos en la respuesta
    res.cookie("tokenRole", tokenRole);   //guardamos el token en una cookie y lo enviamos en la respuesta

    res.status(201).json({  //enviamos la respuesta con el usuario registrado
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    })

  } catch (e) {
    res.status(500).json({ message: e.message }); //si hay un error, devolvemos un error
  }
};

export const logout = (req, res) => {
    res.cookie("token", "", {expires: new Date (0)});//eliminamos la cookie
    //Le enviamos un token vacío, así removemos el token que teníamos guardado, y le decimos que expire en una fecha pasada, así se elimina
    return res.status(200).json({message: "Logged out"})
};

export const profile = async (req, res) => {
  const userFound= await User.findById(req.user.id);
  
  if(!userFound) return res.status(400).json({message: "User not found"})

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
  })

};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
}
