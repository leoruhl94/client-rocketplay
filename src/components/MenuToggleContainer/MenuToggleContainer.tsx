import { motion } from "framer-motion";
import React from "react";
import './MenuToggleContainer.scss'

interface props{
    children?: React.ReactNode,
    transition?: any
}
export const MenuToggleContainer: React.FC<props> = ({children, transition}) => {
    
    return(
        <motion.div
        className="MenuToggleContainer"
        initial="out"
        animate="in"
        exit="out"
        variants={transition}
        transition={{ type: "linear" }}
        >
            {children}
        </motion.div>
    )
}