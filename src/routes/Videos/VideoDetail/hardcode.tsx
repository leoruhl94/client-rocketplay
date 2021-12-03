// Hardcode para poder mostrarlo

// ----------------------------------------------------------------------
// Lo que tendrán los videos
export interface Videos {
    id : string,
    description : string,
    categories : [{ id: number, name: string}],
    

}
// ----------------------------------------------------------------------
// Lo que tendrán los comentarios
export interface Comments {
    name : string,
    authorId : string,    // Quién realizó el comentario
    description : string, // El comentario en si
    // asociated video - Muestra el id del video al que se comentó
    createdAt : string // El día en que se publicó
}


export interface CommentsYT {/* Un video de youtube tiene descripción y datos del autor*/ 
    name : string,
    authorImg : string,
    authorChannelUrl : string,
    textDisplay : string,
    publishedAt : string

}

// Creo que serían los que tienen los autores
export interface Author {
    id : string,
    name : string,
    description : string
    iamge : string
}
