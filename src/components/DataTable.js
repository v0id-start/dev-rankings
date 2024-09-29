import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../css/leaderboard.css';
import AddDevButton from './AddDevButton';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { isAdmin, handlePointsUpdate, handleInputChange, handlePeriodsUpdate, handleBulkPointsUpdate } from '../utils/firebaseHelpers';
import UserRow from './UserRow';
import { ProgressBar } from 'react-bootstrap';

const DataTable = ({ selectedPeriod, userEmail, bugSquashed }) => {
    const [users, setUsers] = useState([]);
    const [pointsInputs, setPointsInputs] = useState({});
    const [selectedUsers, setSelectedUsers] = useState({});

    const IS_ADMIN = isAdmin(userEmail);

    useEffect(() => {
        const usersRef = collection(db, 'users');
        let q = query(usersRef, orderBy('Points', 'desc'));

        if (selectedPeriod !== 'All') {
            q = query(usersRef, where('Period', 'array-contains', selectedPeriod));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const usersData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            
            // Sort by points (desc), then by name (asc) if points are tied
            usersData.sort((a, b) => {
                if (b.Points === a.Points) {
                return a.Name.localeCompare(b.Name); // Sort alphabetically by Name
                }
                return b.Points - a.Points; // Sort by Points descending
            });

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

    const handleBulkUpdatePoints = async () => {
        await handleBulkPointsUpdate(pointsInputs, setPointsInputs);
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
                    {bugSquashed && (
                        <tr>
                            <td>⌀</td>
                            <td>v̶̨̛̐o̷̬̝͌̅͝ï̵͓͘d̷͚̳͗͆</td>
                            <td><b>12101815</b></td>
                            <td>
                                <ProgressBar variant="custom" className="custom-progress-bar" now={0} />
                            </td>
                            <td>💅</td>
                        </tr>
                        
                    )}
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
                <div style={{ marginTop: '10px' }}>
                    <Button 
                        variant="primary" 
                        onClick={handleBulkUpdatePoints}
                        disabled={Object.keys(pointsInputs).length === 0}
                        style={{ marginBottom: '10px', display: 'block' }}
                    >
                        Update Points
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={handleDeleteSelectedUsers} 
                        disabled={!Object.values(selectedUsers).some(value => value)}
                        style={{ display: 'block' }}
                    >
                        Delete Selected Users
                    </Button>
                </div>
            )}
        </div>
    );
};

export default DataTable;
