import React, { useState, useEffect } from 'react';
import { Table, ProgressBar, Button, Form } from 'react-bootstrap';
import '../css/leaderboard.css'
import AddDevButton from './AddDevButton';
import { db } from '../firebase.js';
import firebase from 'firebase/compat/app';

const DataTable = ({selectedPeriod}) => {
    const [users, setUsers] = useState([]);
    const [pointsInputs, setPointsInputs] = useState({}); // Store points inputs separately

    useEffect(() => {
        const usersRef = db.collection('users');
        let query = usersRef.orderBy('Points', 'desc');
    
        if (selectedPeriod !== 'All') {
          query = query.where('Period', '==', selectedPeriod);
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

  let internIconURL = "https://firebasestorage.googleapis.com/v0/b/dev-rankings-397001.appspot.com/o/images%2Fintern_icon.png?alt=media&token=2f91672c-ee81-4657-8c7f-4c05e58d0ec1"; 
  let jrIconURL = "https://firebasestorage.googleapis.com/v0/b/dev-rankings-397001.appspot.com/o/images%2Fjr_dev_icon.png?alt=media&token=80f78451-4437-4c81-a61b-122fc07cd510";
  let dev1IconURL = "https://firebasestorage.googleapis.com/v0/b/dev-rankings-397001.appspot.com/o/images%2Fdev_1_icon.png?alt=media&token=2a8b6c96-c850-40d9-8937-0723d07d7f7a";
  let dev2IconURL = "https://firebasestorage.googleapis.com/v0/b/dev-rankings-397001.appspot.com/o/images%2Fdev_2_icon.png?alt=media&token=b3d28084-6255-4de9-b7b9-b27e4f9bd016";
  let dev3IconURL = "https://firebasestorage.googleapis.com/v0/b/dev-rankings-397001.appspot.com/o/images%2Fdev_3_icon.png?alt=media&token=2d00fc11-f12f-4326-ad2a-473e953ed6e7";
  let srIconURL = "https://firebasestorage.googleapis.com/v0/b/dev-rankings-397001.appspot.com/o/images%2Fsr_dev_icon.png?alt=media&token=77054d05-5044-40a9-a88c-3d10020e9e5d";
  let guruIconURL = "https://firebasestorage.googleapis.com/v0/b/dev-rankings-397001.appspot.com/o/images%2Fguru_icon.png?alt=media&token=0f3d6f11-116f-43eb-bf23-346a57e0e690";
  
  const INTERN_THRESH = 100;
  const JR_THRESH = 200;
  const DEV_1_THRESH = 300;
  const DEV_2_THRESH = 400;
  const DEV_3_THRESH = 500;
  const SENIOR_THRESH = 600;


  function getRankImgURL(numPoints) {
    if (numPoints < INTERN_THRESH) {
        return internIconURL;
    } else if (numPoints < JR_THRESH) {
        return jrIconURL;
    }
    else if (numPoints < DEV_1_THRESH) {
        return dev1IconURL;
    }
    else if (numPoints < DEV_2_THRESH){
        return dev2IconURL;
    }
    else if (numPoints < DEV_3_THRESH){
        return dev3IconURL;
    }
    else if (numPoints < SENIOR_THRESH){
        return srIconURL;
    }
    else {
        return guruIconURL;
    }
  }

  function getTitleFromPoints(numPoints) {
    if (numPoints < INTERN_THRESH) {
        return "Intern";
    } else if (numPoints < JR_THRESH) {
        return "Jr Developer";
    }
    else if (numPoints < DEV_1_THRESH) {
        return "Developer I";
    }
    else if (numPoints < DEV_2_THRESH){
        return "Developer II";
    }
    else if (numPoints < DEV_3_THRESH){
        return "Developer III";
    }
    else if (numPoints < SENIOR_THRESH){
        return "Developer II";
    }
    else {
        return "Guru"
    }
  }

  function getNextThreshold(numPoints) {
    if (numPoints < INTERN_THRESH)
        return INTERN_THRESH;
    if (numPoints < JR_THRESH)
        return JR_THRESH;
    if (numPoints < DEV_1_THRESH)
        return DEV_1_THRESH;
    if (numPoints < DEV_2_THRESH)
        return DEV_2_THRESH;
    if (numPoints < DEV_3_THRESH)
        return DEV_3_THRESH;
    if (numPoints < SENIOR_THRESH)
        return SENIOR_THRESH;
    return 600
    }

  
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
                    <ProgressBar variant="custom" className="custom-progress-bar"  now={(user.Points / getNextThreshold(user.Points)) * 100} />
                </td>
                <td>{user.Period}</td>

                <td>
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
            </td>

                </tr>
            ))}
            </tbody>
      </Table>
      <AddDevButton/>
    </div>
  );
};

export default DataTable;