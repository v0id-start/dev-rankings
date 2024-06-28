import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import '../css/leaderboard.css';
import AddDevButton from './AddDevButton';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { isAdmin, handlePointsUpdate, handleInputChange, handlePeriodsUpdate } from '../utils/firebaseHelpers';
import UserRow from './UserRow';

const DataTable = ({ selectedPeriod, userEmail }) => {
    const [users, setUsers] = useState([]);
    const [pointsInputs, setPointsInputs] = useState({});
    const [selectedUsers, setSelectedUsers] = useState({});

    const IS_ADMIN = isAdmin(userEmail);

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

    const handleDeleteSelectedUsers = async () => {
        const userIds = Object.keys(selectedUsers).filter(userId => selectedUsers[userId]);
        const deletePromises = userIds.map(userId => deleteDoc(doc(db, 'users', userId)));
        await Promise.all(deletePromises);
        setSelectedUsers({});
    };

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
                        {IS_ADMIN && <th>Add Points</th>}
                        {IS_ADMIN && <th>Delete User</th>}

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
                            isAdmin={IS_ADMIN}
                            selectedUsers={selectedUsers}
                            setSelectedUsers={setSelectedUsers}
                            handlePeriodsUpdate={handlePeriodsUpdate}
                        />
                    ))}
                </tbody>
            </Table>
            {IS_ADMIN && <AddDevButton />}
            {IS_ADMIN && (
                <Button 
                    variant="danger" 
                    onClick={handleDeleteSelectedUsers} 
                    disabled={!Object.values(selectedUsers).some(value => value)}
                    style={{ marginTop: '10px' }}
                >

                Delete Selected Users
            </Button>
            )}
        </div>
    );
};

export default DataTable;