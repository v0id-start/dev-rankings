import { db } from '../firebase/firebase';
import { doc, updateDoc, increment, writeBatch, getDocs, collection } from 'firebase/firestore';
import { getSalaryFromPoints } from './constants';

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

export const handlePcoinUpdate = async (userId, pcoin, pcoinInputs, setPcoinInputs) => {
    if (!Number.isInteger(Number(pcoin))) return;

    try {
        const userDoc = doc(db, 'users', userId);
        await updateDoc(userDoc, {
            pcoin: increment(Number(pcoin)),
        });
        const updatedInputs = { ...pcoinInputs };
        delete updatedInputs[userId];
        setPcoinInputs(updatedInputs);
    } catch (error) {
        console.error('Error updating pcoin:', error);
    }
};

export const handleInputChange = (userId, value, setPointsInputs) => {
    setPointsInputs((prevInputs) => ({
        ...prevInputs,
        [userId]: value,
    }));
};

export const handlePcoinInputChange = (userId, value, setPcoinInputs) => {
    setPcoinInputs((prevInputs) => ({
        ...prevInputs,
        [userId]: value,
    }));
};

export const handlePeriodsUpdate = async (userId, newPeriods) => {
    try {
        const userDoc = doc(db, 'users', userId);
        await updateDoc(userDoc, {
            Period: newPeriods,
        });
    } catch (error) {
        console.error('Error updating periods:', error);
    }
};

export const handleBulkPointsUpdate = async (pointsInputs, setPointsInputs) => {
    const batch = writeBatch(db);
    Object.entries(pointsInputs).forEach(([userId, newPoints]) => {
        if (Number.isInteger(Number(newPoints))) {
            const userDoc = doc(db, 'users', userId);
            batch.update(userDoc, {
                Points: increment(Number(newPoints)),
            });
        }
    });

    try {
        await batch.commit();
        setPointsInputs({});
    } catch (error) {
        console.error('Error updating points:', error);
    }
};

export const payDevs = async () => {
    const batch = writeBatch(db);
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((d) => {
        const curDoc = doc(db, "users", d.data().Name);
        const pcoinToAdd = getSalaryFromPoints(d.data().Points);
        batch.update(curDoc, {pcoin: increment(pcoinToAdd)});
    });

    try {
        await batch.commit();
    } catch (error) {
        console.error('Error updating users:', error);
    }
};



export const updateDocsFromQuery = async (query, docUpdateObj) => {
    const batch = writeBatch(db);
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((d) => {
        // doc.data() is never undefined for query doc snapshots
        const curDoc = doc(db, "users", d.data().Name);
        batch.update(curDoc, docUpdateObj);
    });

    try {
        await batch.commit();
    } catch (error) {
        console.error('Error updating users:', error);
    }
}
