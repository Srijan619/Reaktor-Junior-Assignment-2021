import React from 'react';
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

const Chapters = () => {
    const location = useLocation();
    const history = useHistory();
    const slicedData=location.state
    return (
        <div>
            <h1>Chapters</h1>
            {location.state?
            <>
            <h3>{location.state.data.title}</h3>
            <ul>
            {location.state.data.chapter.map(chapters=>{
                return(
                    <li key={chapters} onClick={() => history.push('/rules/' + chapters, {chapters,slicedData})}>{chapters}</li>
                )
        
                })}
                </ul>
            </>:<></>}
            
        </div>
    );
};

export default Chapters;