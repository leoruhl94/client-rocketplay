import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAuth } from './useAuth'


export function PrivateRoute({component : Component, ...rest}){
    const auth = useAuth()
    console.log(auth?.user)

    return(
        <Route {...rest} render={props => auth?.isLogged() ? <Component {...props}/>: <Redirect to="/login"/>}>
        </Route>
    )
}