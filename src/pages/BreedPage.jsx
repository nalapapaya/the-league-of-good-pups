//Detailed breed page
import React from 'react';
import DogDetail from '../components/DogDetail';

const BreedPage = ({team, setTeam}) => {
    return (
        <div>
            <DogDetail team={team} setTeam={setTeam}/>
        </div>
    );
};

export default BreedPage;