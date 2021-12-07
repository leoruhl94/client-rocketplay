import React from 'react';

// Estilizaciones
import './MenuComponent.scss'

// *********************************************
export const MenuComponent : React.FC = () => {
    // Var box
    

    // ----- ----- ----- ------
    return (<article className="Menu__article-container">
        <h1>Soy el menu</h1>


        <div className="Menu__list-container">

        {/* ..... Channels section ..... */}
        {/* TODO: Channels section */}

        <section  className="Menu__section-container">
        <img className="Menu__testing-image" src="https://img.icons8.com/office/16/000000/react.png"/>
        <p>Channels</p>
        </section>

        {/* ..... Categories section ..... */}
        {/* TODO: Channels section */}
        <section  className="Menu__section-container">
        <img className="Menu__testing-image" src="https://img.icons8.com/office/16/000000/react.png"/>
        <p>Categories</p>
        </section>

        {/* ..... Subscriptions section ..... */}
        {/* TODO: Channels section */}
        <section  className="Menu__section-container">
        <img className="Menu__testing-image" src="https://img.icons8.com/office/16/000000/react.png"/>
        <p>Subscriptions</p>
        </section>

        {/* ..... My Videos section ..... */}
        {/* TODO: Channels section */}
        <section  className="Menu__section-container">
        <img className="Menu__testing-image" src="https://img.icons8.com/office/16/000000/react.png"/>
        <p>My Videos</p>
        </section>

        </div>
    </article>)
}