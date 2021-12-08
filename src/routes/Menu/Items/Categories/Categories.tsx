// Importaciones core
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Routing
import { Link, useHistory } from "react-router-dom";

// .. actions y redux
import { putCategory, truncateCategory } from "../../../../redux/actions";
import { storeState } from "src/redux/type";

// .. INterfaces
import { Categories } from "./hardcode";

// Styling
import "./MenuCategories.scss";

// Icon library
import { Icon } from "../../../../components/Icon/Icon";

// ****************************************
export const MenuCategories: React.FC = () => {
  // Var box
  
  // Hooks varios
  const categories: Categories[] = useSelector(
    (state: storeState) => state.categories
  );
  const dispatch = useDispatch();
  const history = useHistory();

  // .. Iconos
  const icondel = <Icon svg="plusOutline"></Icon>;
  const iconcancel = <Icon svg="cancel"></Icon>;
  const iconPencil = <Icon svg="pencil"></Icon>;
  const iconDelete = <Icon svg="deletex"></Icon>;
  
  // .. useStates
  const [icon, setIcon] = useState(icondel);
  const [bool, setBool] = useState<boolean>(false);
  const [logger, setLogger] = useState<string>("");

  const [selected, setSelected] = useState<string>("");
  const [input, setInput] = useState<string>("");

  //TODO: useEffect para traerme las categorías del backEnd

  // Esto para eliminar las categorías
  function truncateCategories(e) {
    //Complete: ELiminar las categorías del state
    console.log(e);
    dispatch(truncateCategory(e));
  }

  // Toggle 'x' and 'pencil'
  function editTruncate(e) {
    // Complete: Cuándo nosotros demos click al botón va a hacer un toggle del modo edición y modo vista
    setBool(!bool);
    if (bool === true) {
      setIcon(icondel);
      let id = document.querySelectorAll(".Category__button-container");
      id.forEach((x) => {
        x.className = "Category__button-container Category__btn-display";
      });
    } else {
      setIcon(iconcancel);
      let id = document.querySelectorAll(".Category__button-container");
      id.forEach((x) => {
        x.className = "Category__button-container";
      });
    }
  }

  // /******************************** */
  function handleUpload(e) {
    // Complete: Verificar el state local del seleccionado
    // Compete: Tomar los datos del input del popup
    // Complete: Hacer la actualización de título en redux
    // TODO: Hacer la actualización del título pasando el nuevo título y el user al backEnd
    // Complete: La categoría nueva no puede ser igual a una existente
    e.preventDefault();
    console.log(selected);

    const even = (x) => input === x.title;
    if (categories.some(even)) {
      // True -> The category already exists!!!
      setLogger("The category already exists");
      return;
    }else{
      // false -> Category uploaded
      console.log(input);
      dispatch(putCategory(selected,input));
      setLogger("Category succesfully updated");

    }

  }

  function handleData(e) {
    //Complete: Almacenar los cambios del nuevo título
    setInput(e.target.value);
    console.log(input);
  }

  // *****************************

  // Vamos para atrás
  function backed() {
    history.goBack();
  }

  // editamos las categorías
  function editCategories(e) {
    // Complete: Pasamos el valor al state local
    setSelected(e);
    // TODO: Levantamos un popUp
    // Complete: El popup debe tener la data para mostrar
    console.log(e);
  }

  // Captamos cambios del popup

  return (
    <div>
      <button onClick={backed}>Go back Soldier</button>

      <article className="Menu__Categories">
        <h1>Configuration</h1>
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
                <div onClick={(e) => truncateCategories(x.title)}>
                  <button
                    value={x.title}
                    //onClick={e => truncateCategories(e)}
                    className="Category__button-container Category__btn-display"
                  >
                    {iconDelete}
                  </button>
                </div>
                {/* ..... Edit Change  ..... */}
                <div onClick={(e) => editCategories(x.title)}>
                  <button
                    value={x.title}
                    //onClick={e => editCategories(e)}
                    className="Category__button-container Category__btn-display"
                  >
                    {iconPencil}
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

      {/* ..... Pop Up ..... */}
      <section className="Menu__Popup-container">
        <div className="Menu__Popup-frame">
          <form onSubmit={handleUpload}>
            <input
              className="Add__Input-text"
              placeholder="New name..."
              onChange={handleData}
              type="text"
              required
            />
            <input className="Add__Input-btn" type="submit" />
          </form>
        </div>
        {/* ..... Muestra el estado de la acción ..... */}
        {/* TODO: Si sale todo bien, muestra verde el texto */}
        <div className="Add__Category-logger">
                {logger}
            </div>
      </section>
    </div>
  );
};
