import React, { useState, useEffect } from 'react';
import { Table, ProgressBar, Button, Form } from 'react-bootstrap';
import '../css/leaderboard.css'
import AddDevButton from './AddDevButton';
import { db } from '../firebase.js';
import firebase from 'firebase/compat/app';

import { getRankImgURL, getTitleFromPoints, getNextThreshold } from '../constants';

const DataTable = ({selectedPeriod, userEmail}) => {
    const [users, setUsers] = useState([]);
    const [pointsInputs, setPointsInputs] = useState({}); // Store points inputs separately

    useEffect(() => {
        const usersRef = db.collection('users');
        let query = usersRef.orderBy('Points', 'desc');
      
        if (selectedPeriod !== 'All') {
          // Use where to filter based on the selectedPeriod
          query = query.where('Period', 'array-contains', selectedPeriod);
        }
      
        const unsubscribe = query.onSnapshot((snapshot) => {
          const usersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUsers(usersData);
        });
      
        return () => unsubscribe();
      }, [selectedPeriod]);

      const handlePointsUpdate = async (userId, newPoints) => {
        if (!Number.isInteger(Number(newPoints)))
            return;

        try {
          await db.collection('users').doc(userId).update({
            Points: firebase.firestore.FieldValue.increment(Number(newPoints)),
        });
          const updatedInputs = { ...pointsInputs };
          delete updatedInputs[userId]; // Clear the input value after update
          setPointsInputs(updatedInputs);
        } catch (error) {
          console.error('Error updating points:', error);
        }
      };
    
      const handleInputChange = (userId, value) => {
        setPointsInputs((prevInputs) => ({
          ...prevInputs,
          [userId]: value,
        }));
      };
  
    const isAdmin =
      userEmail === 'team.ranking.dev@gmail.com' ||
      userEmail === 'tiffany.price@esd401.org';

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
            {isAdmin && <th>Add Points</th>}
          </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <div className="name-with-image">
                    <img src={getRankImgURL(user.Points)} alt="Rank Icon" className="rank-icon" />
                    <span style={{fontWeight: 'bold'}}>{user.Name}</span>
                    {index === 0 && <span className='decor'>&nbsp;🏆</span>}
                    {index > 0 && index < 5 && <span className='decor'>&nbsp;⭐</span>}
                    </div>
                </td>

                <td>
                <div className="points-with-text">
                  <span className="points-text">{getTitleFromPoints(user.Points)} -</span>
                  <span className="points-value">{user.Points}</span>
                </div>
              </td>

                <td>
                    <ProgressBar variant="custom" className="custom-progress-bar"  now={((user.Points - (getNextThreshold(user.Points) - 100)) / 100) * 100} />
                </td>
                <td>{user.Period.join(", ")}</td>

                {isAdmin && <td>
                    <Form.Group className="input-group">
                        <Form.Control
                            type="number"
                            placeholder="Points"
                            value={pointsInputs[user.id] || ''}
                            onChange={(e) => handleInputChange(user.id, e.target.value)}
                        />
                        <Button
                            onClick={() => handlePointsUpdate(user.id, pointsInputs[user.id])}
                        >
                            Add Points
                        </Button>
                    </Form.Group>
            </td>}

                </tr>
            ))}
            </tbody>
      </Table>
      {isAdmin && <AddDevButton/>}
    </div>
  );
};

export default DataTable;