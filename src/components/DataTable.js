import React, { useState } from 'react';
import Papa from 'papaparse';
import storage from '../firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { Table } from 'react-bootstrap';

const DataTable = () => {
  const [csvData, setCsvData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  const fetchCsvFile = async () => {
    console.log("FETCHING");
    const csvFileRef = ref(storage, 'student_data_small.csv');

    try {
      const url = await getDownloadURL(csvFileRef);
      const response = await fetch(url);
      const text = await response.text();
      console.log(text);

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

  return (
    <div>
    <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(csvData[0]).map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;