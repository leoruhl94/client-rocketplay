import React from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import './SearchMenu.scss'
import { motion } from "framer-motion";

interface props{ 
    transition: any;
  } 
export const SearchMenu: React.FC<props> = ({transition}) => {
    
    return(
        <motion.div initial='out' animate='in' exit='out' variants={transition} transition={{type:'linear'}}>
            <SearchBar/>
            <h1>HOLA MUNDO</h1>
        </motion.div>
     )
}
