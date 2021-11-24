import React from "react";

// Componente about
const AboutComponent: React.FC = () => {
    // Caja de variables

    // ----- ----- ----- ----- -----
    return (
        <div>
            <h1>Este es el about component</h1>
            <button>Acá va un botón de volver</button>
            <h3>Team fullstack</h3>
            <ul>
                {/* COmponentes de integrantes - TODO */}
                <li>INtegrante 1</li> {/** Cada uno es un div en realidad donde mostramos imágen, nombre, lugar de participación, btn LInkedIn */}
                <li>INtegrante 2</li>
                <li>INtegrante 3</li>
                <li>INtegrante 4</li>
                <li>INtegrante 5</li>
                <li>INtegrante 6</li>
                <li>INtegrante 7</li>
                <li>INtegrante 8</li>

            </ul>
        </div>
    )
} 