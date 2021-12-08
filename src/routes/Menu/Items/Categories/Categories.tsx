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
  const icondel = <Icon svg="plusOutline"></Icon>;
  const iconcancel = <Icon svg="cancel"></Icon>;
  const iconPencil = <Icon svg="pencil"></Icon>
  const iconDelete = <Icon svg="deletex"></Icon>

  const [icon, setIcon] = useState(icondel);
  const [bool, setBool] = useState<boolean>(false);


  const [selected, setSelected ] = useState<string>('')
  const [input, setInput] = useState<string>('')

  //TODO: useEffect para traerme las categorías del backEnd

  // Esto para eliminar las categorías
  function truncateCategories(e) {
    console.log(e.target.value);
    dispatch(truncateCategory(e.target.value));
  }

  // Toggle 'x' and 'pencil'
  function editTruncate(e) {
    setBool(!bool);
    if (bool === true) {
      setIcon(icondel);
      let id = document.querySelectorAll(".Category__button-container");
      id.forEach((x) => { x.className = "Category__button-container Category__btn-display";  })
    } else {
        setIcon(iconcancel);
        let id = document.querySelectorAll(
          ".Category__button-container"
          );
          id.forEach((x) => { x.className = "Category__button-container";  })
      }
  }

  // Vamos para atrás
  function backed(){
    history.goBack()
  }

  // editamos las categorías
  function editCategories(e){

    console.log(e.target.value);
    setSelected(e.target.value);
    // TODO: Popup con css directo
  }

  // Captamos cambios del popup

  return (
    <div>
        <button onClick={backed}>Go back Soldier</button>


      <article className="Menu__Categories">
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
                {/* ..... Delete Change ..... */}

                  <button
                    value={x.title}
                    onClick={e => truncateCategories(e)}
                    className="Category__button-container Category__btn-display"
                  >
                    {iconDelete}
                  </button>
                {/* ..... Edit Change  ..... */}
                  <button
                    value={x.title}
                    onClick={e => editCategories(e)}
                    className="Category__button-container Category__btn-display"
                  >
                    {iconPencil}
                  </button>
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

          {/* ..... Pop Up ..... */}
          {/* <section className="Menu__Popup-container">
              <div className="Menu__Popup-frame">
              <form onSubmit={handleUpload}>
                <input className="Add__Input-text" placeholder="Name..." onChange={handleData} type="text" required />
                <input className="Add__Input-btn" type="submit" />
            </form>
              </div>
          </section> */}

    </div>
  );
};
