import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAuth } from './useAuth'


export function PrivateRoute({component : Component, ...rest}){
    const auth = useAuth()
    // console.log("PRIVATE ROUTE USER ",auth?.user)
    // console.log("PRIVATE ROUTE IS LOGGED",auth?.isLogged())

    return(
        <Route {...rest} render={props => auth?.isLogged() ? <Component {...props}/>: <Redirect to="/login"/>}>
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
