import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readNotifications } from "../../redux/actions";
import { storeState } from "src/redux/type";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import './NotificationsMenu.scss'


export const NotificationsMenu: React.FC = () => {
    const { notifications } = useSelector((state: storeState) => state)
    const dispatch = useDispatch()
    console.log('here Notifications')
    useEffect(() => {
        dispatch(readNotifications())
    },[])
    return(
        <MenuToggleContainer>
            {!notifications.length ? <h2 className="notification__empty">There is not notifications</h2> : null}
            {notifications.map((n, i) => <div key={i} className='notification__container'>
                <div className="notification__point"></div>
                <span className='notification__text'>{`${n.message} (${n.status})`}</span>
            </div>)}
        </MenuToggleContainer>
     )
}