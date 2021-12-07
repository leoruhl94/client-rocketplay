import React from 'react'
import { Route, Redirect } from 'react-router'
import { useAuth } from './useAuth'


export function PrivateRoute({component : Component, ...rest}){
    const auth = useAuth()
    console.log(auth)
    console.log(auth?.isLogged())
    return(
        <Route {...rest}>
            {/* <Component/> */}
            { auth.isLogged() ? <Component/>: <Redirect to="/login"/> }
        </Route>
    )
}