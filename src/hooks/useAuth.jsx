import AuthContext from '@/context/AuthProvider';
import { useContext } from 'react';

const useAuth = () => {
    return useContext(AuthContext); //현재 context의 값을 반환하는 hook
};

export default useAuth;
