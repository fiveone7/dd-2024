import React, { createContext, useState } from 'react';
import {useCookies} from "react-cookie";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['dialogue-daily-token', 'dialogue-daily-user']);

    const login = ({email, token}) => {
        setUser({email})
        setCookie("dialogue-daily-token", token);
        setCookie("dialogue-daily-user", email);
    };

    const logout = () => {
        setUser(null);
        removeCookie("dialogue-daily-token");
        removeCookie("dialogue-daily-user");
    };

    const cookieAlive = ()=> {
        if (cookies['dialogue-daily-user'])
            return cookies['dialogue-daily-user'];
        else
            return false;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, cookieAlive }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
