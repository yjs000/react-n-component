import MenuContext from '@/context/MenuProvider';
import { useContext } from 'react';

const useMenu = () => {
    return useContext(MenuContext); //현재 context의 값을 반환하는 hook
};

export default useMenu;
