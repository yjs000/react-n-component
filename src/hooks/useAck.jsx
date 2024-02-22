import AckContext from '@/context/AckProvider';
import { useContext } from 'react';

const useAck = () => {
    return useContext(AckContext); //현재 context의 값을 반환하는 hook
};

export default useAck;
