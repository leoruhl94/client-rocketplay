import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAuth } from './useAuth'


export function PrivateRoute({component : Component, ...rest}){
    const auth = useAuth()
    console.log("PRIVATE ROUTE USER ",auth?.user)
    console.log("PRIVATE ROUTE IS LOGGED",auth?.isLogged())

    return(
        <Route {...rest} render={props => auth?.isLogged() ? <Component {...props}/>: <Redirect to="/login"/>}>
        </Route>
    )
}