import React from 'react';
import ArtworksTable from './ArtworksTable';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';  
import 'primeicons/primeicons.css';  


const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Artworks Gallery</h1>
            <ArtworksTable />
        </div>
    );
};

export default App;
