
// ----------------------------------------------------------------------

export interface CommentsYT {/* Un video de youtube tiene descripción y datos del autor*/ 
    name : string,
    authorImg : string,
    authorChannelUrl : string,
    textDisplay : string,
    publishedAt : string
    
}

// Vimeo section --------------------------------
// Los videos de vimeo
export interface VimeoInt {
    created_time : string,
    description : string,
    metadata: { comments : string, credits : string, likes : string, pictures : string },
    name : string,
    user : {
        name : string,
        createdTime : string,
        link : string,
        location : string,
        gender : string,
        pictures : string,
        uri : string
    }
} 

export interface CommentsVimeo {
    uri : string,
    text : string,
    created_on : string,
    link : string,
    user : {
        uri: string,
        name : string,
        link : string,
        pictures : {
            base_link : string
        }
    }

}
