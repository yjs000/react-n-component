import { createContext, useState } from 'react';

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(sessionStorage.getItem(`_auth`)));

    console.log("auth", auth, "setAuth", setAuth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
