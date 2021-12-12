import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router'
import { changePage } from '../redux/actions'
import { storeState } from 'src/redux/type'
import { useAuth } from './useAuth'
import { pageTransition } from '../constants/functions'

interface Props{
    component?:any, 
    currPage?:number, 
    thisPage?:number, 
    changePage?(value: any): any;
    exact?:any;
    path?:any
}

export const PrivateRoute: React.FC<Props> = ({component : Component, currPage=0, thisPage=0, ...rest}) => {

    const auth = useAuth()
    const dispatch = useDispatch()
    //const {page} = useSelector((state: storeState) => state)
    const storagePage = sessionStorage.getItem('page')
    const page = storagePage ? Number(storagePage) : undefined
    let transition //= (thisPage && page && thisPage !== page) ? ((page - thisPage > 0) ? 'left' : 'right') : undefined
    transition = (thisPage && page && thisPage !== page) ? ((page - thisPage > 0) ? 'left' : 'right') : undefined
    console.log('thisPage: '+thisPage)
    console.log('page: '+page)
    console.log('transition: '+transition)
    useEffect(() => {
        //console.log(transition)
        sessionStorage.setItem('page',thisPage.toString())
        //dispatch(changePage(thisPage))
        //console.log('use effect page')
    }, [thisPage])

    // console.log("PRIVATE ROUTE USER ",auth?.user)
    // console.log("PRIVATE ROUTE IS LOGGED",auth?.isLogged())
    return(
        <Route {...rest} render={props => auth?.isLogged() ? <Component {...props} transition={pageTransition(transition)}/>: <Redirect to="/login"/>}>
        </Route>
    )
}
 
// interface Props{
//     component?:any; 
//     currPage?:number; 
//     thisPage?:number; 
//     changePage?(value: any): any;
//     exact:Boolean;
//     path:String

// }

// export const PrivateRoute: React.FC<Props> = (
//     {component : Component, currPage=0, thisPage=0, changePage, ...rest}
//     ) => {
//     const auth = useAuth()
//     const transition = (thisPage && currPage && thisPage !== currPage) ? ((thisPage - currPage) ? 'left' : 'right') : 'opacity'
//     changePage && changePage(thisPage)
//     // console.log("PRIVATE ROUTE USER ",auth?.user)
//     // console.log("PRIVATE ROUTE IS LOGGED",auth?.isLogged())
//     return(
//         <Route {...rest} render={props => auth?.isLogged() ? <Component {...props} transition={transition}/>: <Redirect to="/login"/>}>
//         </Route>
//     )
// }
