import { useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const usuario = localStorage.getItem("usuario");
        return usuario ? JSON.parse(usuario) : { name: "" };
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("jwt");
    });

    const login = (user, token) => {
        setUser(user);
        setToken(token);

        localStorage.setItem("jwt", token);
        localStorage.setItem("usuario", JSON.stringify(user));
    }

    const logout = () =>{
        setUser({name:''});
        setToken(null)

        localStorage.removeItem("jwt");
        localStorage.removeItem("usuario");
    }
    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext}