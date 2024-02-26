import { createContext, useState } from 'react';
import {getCookie} from "@/cmmn.js";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getCookie('token'));
    console.log("auth", auth)
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
