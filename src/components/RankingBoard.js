
import React from 'react';
import { useState } from 'react';
import NavbarComponent from './NavbarComponent';

function App() {
    const [selectedPeriod, selectPeriod] = useState("All");

    const handleSelectPeriod = (periodName) => {
        console.log('Selected item:', periodName);
        selectPeriod(periodName);
    };

  return (
    <div>
      <NavbarComponent onSelect={handleSelectPeriod} />
      <body><h1>{selectedPeriod}</h1></body>
      {/* Rest of your app content */}
    </div>
  );
}

export default App;