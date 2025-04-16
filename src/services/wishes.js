import { db, auth } from '../../Firebase';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';

export const saveWish = async ({ title, description = '', link = '', imageUrl = '' }) => {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const wish = {
        title,
        description,
        link,
        imageUrl,
        reserved: false,
        createdAt: new Date().toISOString(),
    };

    await addDoc(collection(db, `users/${user.uid}/wishes`), wish);
};

export const getWishes = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const wishesRef = collection(db, `users/${user.uid}/wishes`);
    const snapshot = await getDocs(wishesRef);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const deleteWishById = async (wishId) => {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const ref = doc(db, `users/${user.uid}/wishes/${wishId}`);
    await deleteDoc(ref);
};

export const updateWishDone = async ({ wishId, done }) => {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const ref = doc(db, `users/${user.uid}/wishes/${wishId}`);
    await updateDoc(ref, { done });
};

export const updateWishById = async ({ wishId, title, description, link }) => {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const ref = doc(db, `users/${user.uid}/wishes/${wishId}`);
    await updateDoc(ref, {
        title,
        description,
        link,
    });
};
