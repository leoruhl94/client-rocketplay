import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export function useAuth() {
    const contextValue = useContext(AuthContext)
    return contextValue
}