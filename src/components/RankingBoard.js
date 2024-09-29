import React from 'react';
import { useState } from 'react';
import NavbarComponent from './NavbarComponent';
import DataTable from './DataTable';
import '../css/leaderboard.css'
import ThresholdInfo from './ThresholdInfo';
import GainingExpTable from './GainingExpTable';

// Get a reference to the storage service, which is used to create references in your storage bucket

// Create a storage reference from our storage service
//const memeRef = ref(storage, 'images/meme.png');
//const memeURL = await getDownloadURL(memeRef);

function RankingBoard({userEmail, bugSquashed}) {
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
          <DataTable selectedPeriod={selectedPeriod} userEmail={userEmail} bugSquashed={bugSquashed}/>
          <br/>
          <br/>
          <br/>
          <br/>
          <ThresholdInfo className="info-table"/>
          <br/>
          <br/>
          <GainingExpTable className="info-table"/>
        </div>
      </div>
    </div>
  );
}

export default RankingBoard;