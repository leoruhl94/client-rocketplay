import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { postCategory } from "../../../../redux/actions";

//Estilización
import './addCategory.scss'
import { Categories } from './hardcode';
import { storeState } from '../../../../redux/type';

export const AddCategory : React.FC = () => {
    
    // TODO: Los videos aunque sean 0 deben venir de igual manera del backEnd

    const [input, setInput] = useState<string>('');
    const [logger, setLogger] = useState<string>('');

    const dispatch = useDispatch()

    let history = useHistory();
    const categories : Categories[] = useSelector((state : storeState) => state.categories)

    function handleUpload(e){
        //Complete: Mandar al state por ahora
        e.preventDefault()
        const even = (x) => input === x.title
        if(categories.some(even)){
            setLogger('The category already exists');
            return;
        }
        else{
            dispatch(postCategory(input))
            history.goBack()
        }
    }
    function handleData(e){
        setInput(e.target.value)
        console.log(input);
    }

    return (<article className="Add__Category-container">
            <div className="Add__title-text">
                <h1>Add a new category</h1>
            </div>
            <form onSubmit={handleUpload}>
                <input className="Add__Input-text" placeholder="Name..." onChange={handleData} type="text" required />
                <input className="Add__Input-btn" type="submit" />
            </form>

            <div className="Add__Category-logger">
                {logger}
            </div>

            </article>)
}