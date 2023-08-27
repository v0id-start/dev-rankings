import React, { useState } from 'react';
import Papa from 'papaparse';
import storage from '../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { Table, ProgressBar } from 'react-bootstrap';
import '../css/leaderboard.css'

const DataTable = ({selectedPeriod}) => {
  const [csvData, setCsvData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let lvl1URL = "https://firebasestorage.googleapis.com/v0/b/dev-rankings-397001.appspot.com/o/images%2Fdev_icon_1.png?alt=media&token=90972564-6e39-4b55-951d-028359388761"; 
  let lvl2URL = "https://firebasestorage.googleapis.com/v0/b/dev-rankings-397001.appspot.com/o/images%2Fdev_icon_2.png?alt=media&token=6ebe8e13-7bdc-412e-8425-556d7fdfcc08";
  let lvl3URL = "https://firebasestorage.googleapis.com/v0/b/dev-rankings-397001.appspot.com/o/images%2Fdev_icon_3.png?alt=media&token=efee4723-5d7c-45db-b15c-434f8c1a6894";
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
    if (numPoints < 300) {
        return lvl1URL;
    } else if (numPoints < 900) {
        return lvl2URL;
    }
    else {
        return lvl3URL;
    }
  }

  function getTitleFromPoints(numPoints) {
    if (numPoints < 300) {
        return "Intern";
    } else if (numPoints < 900) {
        return "Junior Engineer";
    }
    else if (numPoints < 980) {
        return "Senior Engineer";
    }
    else {
        return "Guru";
    }
  }

  function getNextThreshold(numPoints) {
    if (numPoints < 300)
        return 300;
    if (numPoints < 900)
        return 900;
    return 1000
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