import React from 'react';
import { useLocation } from "react-router";

const Chapters = () => {
    const location = useLocation();
    console.log(location.state.data.chapter)
    return (
        <div>
            <h1>Chapters</h1>
            {location.state?
            <>
            <h3>{location.state.data.title}</h3>
            {location.state.data.chapter.map(chapters=>{
                return(
                    <p>
                    <a>{chapters}</a>
                    <br/>
                    </p>
                )
        
                })}
            </>:<></>}
        </div>
    );
};

export default Chapters;