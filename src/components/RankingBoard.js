import React from 'react';
import { useState } from 'react';
import NavbarComponent from './NavbarComponent';
import { ref, getDownloadURL} from "firebase/storage";
import Papa from "papaparse";
import { Table } from 'react-bootstrap';
import DataTable from './DataTable';


// Get a reference to the storage service, which is used to create references in your storage bucket

// Create a storage reference from our storage service
//const memeRef = ref(storage, 'images/meme.png');
//const memeURL = await getDownloadURL(memeRef);

function RankingBoard() {
    const [selectedPeriod, selectPeriod] = useState("All");
    // This state will store the parsed data

    const handleSelectPeriod = (periodName) => {
        console.log('Selected item:', periodName);
        selectPeriod(periodName);
    };

  return (
    <div>
      <NavbarComponent onSelect={handleSelectPeriod} />
      <h1>{selectedPeriod}</h1>
      <div>
      <DataTable />
      </div>
    </div>
  );
}

export default RankingBoard;