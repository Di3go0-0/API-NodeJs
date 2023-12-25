import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type : String,  //se especifica el tipo de dato
        required : true,    //se especifica que es requerido
        trim: true,     //se especifica que no puede tener espacios
    },
    email: {
        type: String, //Se expesifica el tipo de dato
        required: true, //Se especifica que es requerido
        trim: true, //Se especifica que no puede tener espacios
        unique: true, //Se especifica que no puede haber dos iguales
    },
    password:{
        type: String, //Se especifaca el tipo de dato
        required: true, //Se especifica que es requerido
    }, //haz una seccion para ver si es usuario o admin
    role:{
        type : String, //Se especifica el tipo de dato
        required : true, //Se especifica que es requerido
    }
},
{
    timestamps: true, //Se especifica que se guardaran los datos de creación y actualización
});

export default mongoose.model ("User", userSchema); //Se exporta el modelo o esquema del usuario