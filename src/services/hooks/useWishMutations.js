import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    saveWish,
    deleteWishById,
    updateWishDone,
    updateWishById
} from '../wishes';

export const useWishMutations = () => {
    const queryClient = useQueryClient();

    const addWish = useMutation({
        mutationFn: saveWish,
        onSuccess: () => queryClient.invalidateQueries(['wishes']),
    });

    const removeWish = useMutation({
        mutationFn: deleteWishById,
        onSuccess: () => queryClient.invalidateQueries(['wishes']),
    });

    const checkWish = useMutation({
        mutationFn: updateWishDone,
        onSuccess: () => queryClient.invalidateQueries(['wishes']),
    });

    const editWish = useMutation({
        mutationFn: updateWishById,
        onSuccess: () => queryClient.invalidateQueries(['wishes']),
    });

    return { addWish, removeWish, checkWish, editWish };
};
