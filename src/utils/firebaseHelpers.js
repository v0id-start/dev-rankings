import { db } from '../firebase/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

export const isAdmin = (email) => {
    return email === 'team.ranking.dev@gmail.com' || email === 'tiffany.price@esd401.org' || email === 'price.ethan.cs@gmail.com';
};

export const handlePointsUpdate = async (userId, newPoints, pointsInputs, setPointsInputs) => {
    if (!Number.isInteger(Number(newPoints))) return;

    try {
        const userDoc = doc(db, 'users', userId);
        await updateDoc(userDoc, {
            Points: increment(Number(newPoints)),
        });
        const updatedInputs = { ...pointsInputs };
        delete updatedInputs[userId];
        setPointsInputs(updatedInputs);
    } catch (error) {
        console.error('Error updating points:', error);
    }
};

export const handleInputChange = (userId, value, setPointsInputs) => {
    setPointsInputs((prevInputs) => ({
        ...prevInputs,
        [userId]: value,
    }));
};