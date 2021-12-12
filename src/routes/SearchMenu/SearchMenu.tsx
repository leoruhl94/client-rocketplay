import React from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import './SearchMenu.scss'


export const SearchMenu: React.FC = () => {
    
    return(
        <MenuToggleContainer>
            <SearchBar/>
            <h1>HOLA MUNDO</h1>
        </MenuToggleContainer>
     )
}
