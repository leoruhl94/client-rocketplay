import React from "react";
import { Link } from "react-router-dom";

// Estilizaciones
import "./MenuComponent.scss";

// *********************************************
export const MenuComponent: React.FC = () => {
  // Var box

  // ----- ----- ----- ------
  return (
    <article className="Menu__article-container">
      <h1 className="Menu__main-title">Dashboard</h1>

      <div className="Menu__list-container">
        
        
        {/* ..... Channels section ..... */}
        {/* TODO: Channels section */}
        <section className="">
          <Link className="Menu__section-container" to="/menu/channels">
            <img
              className="Menu__testing-image"
              src="https://img.icons8.com/office/16/000000/react.png"
            />
            <span>Channel</span>
          </Link>
        </section>

        {/* ..... Categories section ..... */}
        {/* TODO: Categories section */}
        <section className="">
          <Link className="Menu__section-container" to="/menu/categories">
            <img
              className="Menu__testing-image"
              src="https://img.icons8.com/office/16/000000/react.png"
            />
            <span>Categories</span>
          </Link>
        </section>

        {/* ..... Subscriptions section ..... */}
        {/* TODO: Subscriptions section */}
        <section className="">
          <Link className="Menu__section-container" to="menu/subscriptions">
            <img
              className="Menu__testing-image"
              src="https://img.icons8.com/office/16/000000/react.png"
            />
            <span>Subscriptions</span>
          </Link>
        </section>

        {/* ..... My Videos section ..... */}
        {/* TODO: My Videos section */}
        <section className="">
          <Link className="Menu__section-container" to="/menu/channels">
            <img
              className="Menu__testing-image"
              src="https://img.icons8.com/office/16/000000/react.png"
            />
            <span>My Videos</span>
          </Link>
        </section>
      </div>
    </article>
  );
};
