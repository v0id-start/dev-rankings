import { db } from '../firebase/firebase';
import firebase from 'firebase/compat/app';

export const isAdmin = (email) => {
    return email === 'team.ranking.dev@gmail.com' || email === 'tiffany.price@esd401.org' || email === 'price.ethan.cs@gmail.com';
};

export const handlePointsUpdate = async (userId, newPoints, pointsInputs, setPointsInputs) => {
    if (!Number.isInteger(Number(newPoints))) return;

    try {
        await db.collection('users').doc(userId).update({
            Points: firebase.firestore.FieldValue.increment(Number(newPoints)),
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