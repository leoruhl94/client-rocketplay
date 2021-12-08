import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { truncateCategory } from "../../../../redux/actions";
import { storeState } from "src/redux/type";
import { Categories } from './hardcode';
import './MenuCategories.scss'

// ****************************************
export const MenuCategories : React.FC = () => {
    // Var box
    const categories : Categories[] = useSelector((state : storeState) => state.categories)
    const dispatch = useDispatch()
    //TODO: useEffect para traerme las categorías


    // Esto para eliminar las categorías
    function truncateCategories(e){
        console.log(e.target.value);
        dispatch(truncateCategory(e.target.value))
    }

return(<div>
        {/* ..... Main article ..... */}
        <article className="Menu__Categories">
            {/* TODO: Show categories (Marcos) */}
            {/* TODO: Show videos  */}
            <h1>Categories Route</h1>
            
            { categories.length === 0 ? <div className="Category__Notfound">
                        {/* Title container */}
                        <div className="">
                            <h3 className="Category__title">There's no categories Here</h3>
                        </div>
                        {/* Close container */}
                        <div>
                        <img className="Category__Notfound-img" src="https://img.icons8.com/windows/96/000000/nothing-found.png"/>                        </div></div> :

                categories.map((x) => {
                    return (
                        <div className="Menu__Category-container">
                        {/* Title container */}
                        <div className="Category__description-container">
                            <h2 className="Category__title">{x.title}</h2>
                            <p className="Category__Videos">{x.videos} Videos Found</p>
                        </div>
                        {/* Close container */}
                        <div>
                        <button onClick={truncateCategories} value={x.title} className="Category__button-container">x</button>
                        </div>
                    </div>
                    )
                })
            }
                        {/* ..... Add a category ..... */}
                        <Link to="categories/addcategory" className="Menu__Category-container">
                        {/* Title container */}
                        <div className="Category__description-container">
                            <h2 className="Category__title">Add a new category</h2>
                        </div>
                        </Link>
            

        </article>
    </div>)
}