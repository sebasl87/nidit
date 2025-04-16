import { useQuery } from '@tanstack/react-query';
import {getWishes} from "../wishes";


export const useWishes = () => {
    return useQuery({
        queryKey: ['wishes'],
        queryFn: getWishes,
    });
};
