# Unidad 4 Actividad 1

Descripción: Crear pelicula

METODO: POST

URI: /peliculas

Json enviado

{

&#x09;"id": 10,

&#x09;"nombre": "The Batman",

&#x09;"director": "Matt Reeves",

&#x09;"año": 2022,

&#x09;"duración": 192,

&#x09;"genero": "Thriller"

}



Json recibido

{

&#x09;"code":200,

&#x09;"msj": "Pelicula creada con exito"

}

\-------------------------------------------------------

Descripción: Consulta por id

METODO: GET

URI: /peliculas/10

Json enviado

{



}



Json recibido

{

&#x09;"id": 10,

&#x09;"nombre": "The Batman",

&#x09;"director": "Matt Reeves",

&#x09;"año": 2022,

&#x09;"duración": 192,

&#x09;"genero": "Thriller"

}

\-------------------------------------------------------

Descripción: Actualiza año duración y director por id

METODO: PUT

URI: /peliculas/10

Json enviado

{

&#x09;"director": "Matthew Reeves",

&#x09;"año": 2020,

&#x09;"duración": 190

}



Json recibido

{

&#x09;"code":200,

&#x09;"msj": "Pelicula actualizada con exito"

}

\-------------------------------------------------------

Descripción: Elimina pelicula por id

METODO: DELETE

URI: /peliculas/10

Json enviado

{



}



Json recibido

{

&#x09;"code":200,

&#x09;"msj": "Pelicula eliminada con exito"

}



