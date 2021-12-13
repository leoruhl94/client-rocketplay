import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readNotifications } from "../../redux/actions";
import { storeState } from "src/redux/type";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import './NotificationsMenu.scss'
import { motion } from "framer-motion";

interface props{ 
    transition: any;
  } 
export const NotificationsMenu: React.FC<props> = ({transition}) => {
    const { notifications } = useSelector((state: storeState) => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readNotifications())
    },[])
    return(
        <motion.div initial='out' animate='in' exit='out' variants={transition} transition={{type:'linear'}}>
            {!notifications.length ? <h2 className="notification__empty">There is not notifications</h2> : null}
            {notifications.map((n, i) => <div key={i} className='notification__container'>
                <div className="notification__point"></div>
                <span className='notification__text'>{`${n.message} (${n.status})`}</span>
            </div>)}
        </motion.div>
     )
}