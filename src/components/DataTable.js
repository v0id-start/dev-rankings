import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import '../css/leaderboard.css';
import AddDevButton from './AddDevButton';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { isAdmin, handlePointsUpdate, handleInputChange } from '../utils/firebaseHelpers';
import UserRow from './UserRow';

const DataTable = ({ selectedPeriod, userEmail }) => {
    const [users, setUsers] = useState([]);
    const [pointsInputs, setPointsInputs] = useState({});

    useEffect(() => {
        const usersRef = collection(db, 'users');
        let q = query(usersRef, orderBy('Points', 'desc'));

        if (selectedPeriod !== 'All') {
            q = query(usersRef, where('Period', 'array-contains', selectedPeriod), orderBy('Points', 'desc'));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const usersData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersData);
        });

        return () => unsubscribe();
    }, [selectedPeriod]);

    return (
        <div>
            <Table className='leaderboard-table' striped bordered hover>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Promotion Progress</th>
                        <th>Period</th>
                        {isAdmin(userEmail) && <th>Add Points</th>}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            index={index}
                            pointsInputs={pointsInputs}
                            handlePointsUpdate={handlePointsUpdate}
                            handleInputChange={handleInputChange}
                            setPointsInputs={setPointsInputs}
                            isAdmin={isAdmin(userEmail)}
                        />
                    ))}
                </tbody>
            </Table>
            {isAdmin(userEmail) && <AddDevButton />}
        </div>
    );
};

export default DataTable;