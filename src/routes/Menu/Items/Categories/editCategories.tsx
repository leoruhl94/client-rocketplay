import React from "react";
import { useSelector } from "react-redux";
import { Categories } from "./hardcode";
import { storeState } from "../../../../redux/type";
import { Link, useHistory } from "react-router-dom";
//Usecases

//***********************************************
export const EditCategories: React.FC = () => {
  // Var box
  const categories: Categories[] = useSelector(
    (state: storeState) => state.categories
  );
    const history = useHistory()

    function backed(){
        history.goBack()
    }
    
  // ******************
  return (
    <div>
        
      {/* ..... Mapping article ..... */}

        <button onClick={backed}>Go back Soldier</button>

      <article className="Menu__Categories">

        <div className="Menu__Toggle-btns">
          <h1>Categories</h1>
        </div>


        {/* ..... Categories mapping ..... */}
        {
        categories.length === 0 ? (
          <div className="Category__Notfound">
            {/* Title container */}
            <div className="">
              <h3 className="Category__title">There's no categories Here</h3>
            </div>
            {/* Close container */}
            <div>
              <img
                className="Category__Notfound-img"
                src="https://img.icons8.com/windows/96/000000/nothing-found.png"
              />{" "}
            </div>
          </div>
        ) : (
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
                  <Link to={x.title} ><button
                    value={x.title}
                    className="Category__button-container"
                  >
                    {'>'}
                  </button> </Link>
                </div>
              </div>
            );
          })
        )}

      </article>
    </div>
  );
};
