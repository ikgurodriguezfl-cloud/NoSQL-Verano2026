const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());
const PORT = 3000;
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix")
.then(()=>{
    console.log("Conectado correctamente a MongoDB");
})
.catch((error)=>{
    console.log("Error al conectar con MongoDB: ", error);
});

const peliculaSchema = new mongoose.Schema(
    {
        titulo: {type: String, required: true},
        genero: {type: String, required: true},
        año: {type: Number, required: true},
        duracion: {type: Number, required: true},
        idioma: {type: String, required: true},
        calificacion: {type: Number, required: true}
    },
    {
        timestamps: true
    }
);
const Pelicula = mongoose.model("Pelicula", peliculaSchema, "peliculas");

app.get("/peliculas", async (req,res) =>{
    try{
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    }
    catch(error){
        res.status(500).json({
            mensaje: "Error al obtener los datos",
            error: error
        });
    }
});


app.get("/peliculas/:id", async (req,res) =>{
    try{
        const id = req.params.id;
        const pelicula = await Pelicula.findById(id);
        if(!pelicula){
            return res.status(404).json({mensaje: "Pelicula no encontrado"});
        }
        res.json(pelicula);

    }catch(error){
        res.status(500).json({
            mensaje: "Error al obtener los datos",
            error: error
        });
    }
    
});

app.post("/peliculas", async (req,res) =>{
    try{
    const {titulo, genero, año, duracion, idioma, calificacion} = req.body;
    if(!titulo || !genero || !año || !duracion || !idioma || !calificacion){
        return res.status(400).json({mensaje: "Faltan datos del pelicula"});
    }
    const nuevoPelicula = new Pelicula({
        titulo, genero, año, duracion, idioma, calificacion
    });
    const peliculaGuardado = await nuevoPelicula.save();
    res.json({mensaje: "Pelicula registrado correctamente", pelicula: peliculaGuardado});
    
    }catch(error){
        res.status(500).json({
            mensaje: "Error al registrar el pelicula",
            error: error
        });
    }

});

app.put("/peliculas/:id", async (req,res) =>{
    try{
        const id = req.params.id;
        const {titulo, genero, año, duracion, idioma, calificacion} = req.body;

        if(!titulo || !genero || !año || !duracion || !idioma || !calificacion){
            return res.status(400).json({mensaje: "Faltan datos del pelicula"});
        }
        
        const peliculaActualizado = await Pelicula.findByIdAndUpdate(id, 
            {titulo, genero, año, duracion, idioma, calificacion},
            {new: true, runValidators: true}
        )
        if(!peliculaActualizado){
            return res.status(404).json({mensaje: "Pelicula no encontrado"});
        }
        res.json({
            mensaje: "Pelicula actualizado correctamente",
            pelicula: peliculaActualizado
        });

    }catch(error){
        res.status(500).json({
            mensaje: "Error al actualizar el pelicula",
            error: error
        });
    }
    

});

app.delete("/peliculas/:id", async(req,res)=>{
    try{
    const id = req.params.id;
    const peliculaEliminado = await Pelicula.findByIdAndDelete(id);
    if (!peliculaEliminado){
        return res.status(404).json({
            mensaje: "Pelicula no encontrado"
        });
    }
    res.json({
        mensaje: "Pelicula eliminado correctamente",
        pelicula: peliculaEliminado
    });
    }catch(error){
        res.status(500).json({
            mensaje: "Error al eliminar el pelicula",
        });
    }
    
});   


app.listen(PORT, () => {
  console.log("Servidor iniciado en: http://localhost:"+PORT);
});
