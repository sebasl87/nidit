import { db, auth } from '../../Firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';

export const saveWish = async ({ title, description = '', link = '', imageUrl = '' }) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuario no autenticado");

    const wish = {
        title,
        description,
        link,
        imageUrl,
        reserved: false,
        createdAt: new Date().toISOString(),
    };

    await addDoc(
        collection(db, `users/${user.uid}/wishes`),
        wish
    );
};

export const getWishes = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const wishesRef = collection(db, `users/${user.uid}/wishes`);
    const snapshot = await getDocs(wishesRef);

    const wishes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return wishes;
};

export const reserveWish = async (wishId) => {
    const user = auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    const wishRef = doc(db, `users/${user.uid}/wishes/${wishId}`);
    await updateDoc(wishRef, {
        reserved: true
    });
};

export const getPublicWishes = async (userId) => {
    const wishesRef = collection(db, `users/${userId}/wishes`);
    const snapshot = await getDocs(wishesRef);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};
