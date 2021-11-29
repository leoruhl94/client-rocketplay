
// Interfaz para acomodar los tipos de datos que nos llegan del backEnd
export interface Props {
    id: Number
    name : string,
    image : string,
    description : string,
    aboutMe: string,
    linkedin: string,
    github : string
}

export interface Props2 {
    id: number,
    name : string,
    links : {linkedin: string, github : string},
    photo: string,
    description: string,
}
