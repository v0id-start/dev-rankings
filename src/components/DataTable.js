import React, { useState } from 'react';
import Papa from 'papaparse';
import storage from '../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { Table, ProgressBar } from 'react-bootstrap';
import '../css/leaderboard.css'

const DataTable = ({selectedPeriod}) => {
  const [csvData, setCsvData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchCsvFile = async () => {
    console.log("FETCHING");
    const csvFileRef = ref(storage, 'student_data_small.csv');
    const badIconRef = ref(storage, 'images/dev_icon.png');
    const goodIconRef = ref(storage, 'images/dev_icon_2.png');

    try {
      const url = await getDownloadURL(csvFileRef);
      const response = await fetch(url);
      const text = await response.text();
      //badIconURL = await getDownloadURL(badIconRef);
      //goodIconUrl = await getDownloadURL(goodIconRef);

      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          setCsvData(result.data);
          setIsLoading(false); // Set loading state to false after data is fetched
        },
      });
    } catch (error) {
      console.error('Error fetching CSV file:', error);
    }
  };

  React.useEffect(() => {
    fetchCsvFile();
  }, []);

  if (isLoading) {
    return <p>Loading Rankings...</p>;
  }

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

  // Filter the CSV data based on the selectedPeriod
  const filteredData = csvData.filter((row) =>
    selectedPeriod === "All" ? true : "Team " + row.Period === selectedPeriod
  ).sort((a, b) => b.Points - a.Points); // Sort in descending order of Points


  // Add rank based on the sorted order
  const dataWithRank = filteredData.map((row, index) => ({
    Rank: index + 1, // Rank starts from 1
    ...row, // Include the existing row data
  }));

  const dataWithImage = dataWithRank.map((row) => ({
    ...row,
    NameWithImage: (
      <div className="name-with-image">
        <img src={getRankImgURL(row.Points)} alt="Rank Icon" className="rank-icon" />
        <span>{row.Name}</span>
      </div>
    ),
  }));
/*
IDEA:
I can make a progress bar to the next level for each person.

from gpt code for progress bar, use this
*/
  
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
          {dataWithImage.map((row, index) => (
            <tr key={index}>
              <td>{row.Rank}</td>
                <td>
                    <div className="name-with-image">
                    <img src={getRankImgURL(row.Points)} alt="Rank Icon" className="rank-icon" />
                    <span style={{fontWeight: 'bold'}}>{row.Name}</span>
                    {index === 0 && <span className='decor'>&nbsp;🏆</span>}
                    {index > 0 && index < 5 && <span className='decor'>&nbsp;⭐</span>}
                    </div>
                </td>
                <td>
                <div className="points-with-text">
                  <span className="points-text">{getTitleFromPoints(row.Points)} -</span>
                  <span className="points-value">{row.Points}</span>
                </div>
              </td>
              <td>
                <ProgressBar variant="custom" className="custom-progress-bar"  now={(row.Points / getNextThreshold(row.Points)) * 100} />
              </td>
              <td style={{fontWeight: 'bold'}}>{row.Period}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;