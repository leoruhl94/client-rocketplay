import React from 'react'
import { TypescriptComponent } from './components/TypescriptComponent/TypescriptComponent'
// import './styles/global.scss'
import './styles/global.css'


const App: React.FC = () => {

    return (
        <div>
            <h1 className="bg-indigo-500">Parece que funciona</h1>
            <h2>Estilos... Ojala funcionen...</h2>
            <TypescriptComponent/>
        </div>
    )
} 
// Componentes para hacer el día 24 / 11 ->
/*

-> Que hacemos cada uno.

- Navegación        | 
- Home              | M
- Pricing           |
- Login             | 
- About             | E

*/

export default App