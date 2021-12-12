import axios from "axios";
import { motion } from "framer-motion";
import React from "react";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import './SettingMenu.scss'

interface props{ 
    transition: any;
  } 
export const SettingMenu: React.FC<props> = ({transition}) => {

    return(
        <motion.div initial='out' animate='in' exit='out' variants={transition} transition={{type:'linear'}}>
                <h1>HOLA MUNDO</h1>
        </motion.div>
     )
}