import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { postCategory } from "../../../../redux/actions";


export const AddCategory : React.FC = () => {
    
    const [input, setInput] = useState<string>('');
    const dispatch = useDispatch()
    let history = useHistory();

    function handleUpload(e){
        //Complete: Mandar al state por ahora
        e.preventDefault()
        dispatch(postCategory(input))
        history.goBack()
    }
    function handleData(e){
        //Complete: Subir todo
        setInput(e.target.value)
        console.log(input);
    }

    // Complete: Formulario para subir una categoría
    return (<article>
            {/* Complete: Tomar nombre */}
            {/* Neh: Tomar videos para poner categorías */}
            <form onSubmit={handleUpload}>
                <input onChange={handleData} type="text" />
                <input type="submit" />
            </form>


            </article>)
}