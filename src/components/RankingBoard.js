import React from 'react';
import { useState } from 'react';
import NavbarComponent from './NavbarComponent';
import DataTable from './DataTable';
import '../css/leaderboard.css'
import ThresholdInfo from './ThresholdInfo';

// Get a reference to the storage service, which is used to create references in your storage bucket

// Create a storage reference from our storage service
//const memeRef = ref(storage, 'images/meme.png');
//const memeURL = await getDownloadURL(memeRef);

function RankingBoard({userEmail}) {
    const [selectedPeriod, selectPeriod] = useState("All");
    // This state will store the parsed data

    const handleSelectPeriod = (periodName) => {
        selectPeriod(periodName);
    };

  return (
    <div>
      <NavbarComponent onSelect={handleSelectPeriod} />

      <div className="ranking-board-container">
        <h1 style={{ paddingTop: '32px'}}>{selectedPeriod === "All" ? "All Developers" : "Team " + selectedPeriod}</h1>
        <div className="centered-table-container">
          <DataTable selectedPeriod={selectedPeriod} userEmail={userEmail}/>
          <br/>
          <br/>
          <br/>
          <br/>
          <ThresholdInfo />
        </div>
      </div>
    </div>
  );
}

export default RankingBoard;