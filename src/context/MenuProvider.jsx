import { createContext, useState } from 'react';

const MenuContext = createContext({});
export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState(JSON.parse(sessionStorage.getItem(`_menu`)));
    return <MenuContext.Provider value={{ menu, setMenu }}>{children}</MenuContext.Provider>;
};

export default MenuContext;
