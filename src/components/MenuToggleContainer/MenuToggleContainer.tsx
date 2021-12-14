import { motion } from "framer-motion";
import React from "react";
import './MenuToggleContainer.scss'

interface props{
    children?: React.ReactNode,
    transition?: any
    k?:string
}
export const MenuToggleContainer: React.FC<props> = ({children, transition, k}) => {
    return(
        <motion.div
        key={k}
        className="MenuToggleContainer"
        initial="out"
        animate="in"
        exit="out"
        variants={transition}
        transition={{ type: "linear" }}
        key="lp" 
        >
            {children}
        </motion.div>
    )
}