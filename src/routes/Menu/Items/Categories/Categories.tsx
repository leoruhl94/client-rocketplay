import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { truncateCategory } from "../../../../redux/actions";
import { storeState } from "src/redux/type";
import { Categories } from "./hardcode";
import "./MenuCategories.scss";
import { Icon } from "../../../../components/Icon/Icon";

// ****************************************
export const MenuCategories: React.FC = () => {
  // Var box
  const categories: Categories[] = useSelector(
    (state: storeState) => state.categories
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const icondel = <Icon svg="delete"></Icon>;
  const iconcancel = <Icon svg="cancel"></Icon>;

  const [icon, setIcon] = useState(icondel);
  const [bool, setBool] = useState<boolean>(false);

  //TODO: useEffect para traerme las categorías

  // Esto para eliminar las categorías
  function truncateCategories(e) {
    console.log(e.target.value);
    dispatch(truncateCategory(e.target.value));
  }

  // Toggle 'x'
  function editTruncate(e) {
    setBool(!bool);
    if (bool === true) {
      setIcon(iconcancel);
      let id = document.querySelectorAll(
        ".Category__button-container"
      );
      id.forEach((x) => { x.className = "Category__button-container";  })
    } else {
      setIcon(icondel);
      let id = document.querySelectorAll(".Category__button-container");
      id.forEach((x) => { x.className = "Category__button-container Category__btn-display";  })
    }
  }

  function backed(){
    history.goBack()
  }

  return (
    <div>
        <button onClick={backed}>Go back Soldier</button>


      <article className="Menu__Categories">
        {/* TODO: Show videos  */}
        <h1>Configuration</h1>

        {/* ..... Add a category ..... */}
        <Link to="categories/edit" className="Menu__Category-container">
          {/* Title container */}
          <div className="Category__description-container">
            <h2 className="Category__title">Edit Categories</h2>
          </div>
        </Link>
      </article>
      {/* ..... Mapping article ..... */}
      <article className="Menu__Categories">
        {/* Complete: Show categories (Marcos) */}
        {/* TODO: Show videos  */}
        <div className="Menu__Toggle-btns">
          <h1>Categories</h1>
          <h4 className="Menu__Delete-btn" onClick={editTruncate}>
            {icon}
          </h4>
        </div>

        {categories.length === 0 ? (
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
                  <button
                    onClick={truncateCategories}
                    value={x.title}
                    className="Category__button-container"
                  >
                    x
                  </button>
                </div>
              </div>
            );
          })
        )}
        {/* ..... Add a category ..... */}
        <Link to="categories/addcategory" className="Menu__Category-container">
          {/* Title container */}
          <div className="Category__description-container">
            <h2 className="Category__title">Add a new category</h2>
          </div>
        </Link>
      </article>
    </div>
  );
};
