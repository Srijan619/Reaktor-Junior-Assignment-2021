import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router";

const Rules = () => {
    const location = useLocation();
    const allRules = location.state.slicedData.slicedRules // get all rules from the location-router
    const currentChapter = location.state.chapters // set current chapter from locaton

    let resultRules = allRules.filter(obj => { //To filter rules based on the chapters
        return (obj.chapter === currentChapter)
    })
    const [filterText, setFilterText] = useState([]) 
    const [searchKeyWord, setSearchKeyWord] = useState('');

    useEffect(() => {
        setFilterText(destructureObject(resultRules))
        handleSearch(searchKeyWord)
    }, [searchKeyWord]) // eslint-disable-line react-hooks/exhaustive-deps

    const destructureObject = (array) => {  //Function to destructure object to array
        let pushA = [];
        array.forEach(rules => {
            rules.rule.forEach(rule => {
                pushA.push(rule)
            })
        })
        return pushA
    }
    const onhandleChange=(e)=>{  //Handle key input
        setSearchKeyWord(e.target.value)
    }
    const handleSearch = (text) => {
        const delayDebounceFn = setTimeout(() => { //Delay after each text input
            searchTextInArray(text)
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }

    const searchTextInArray = (text) => { //Function to search text in array
        if(!text)setFilterText(destructureObject(resultRules)) //If no  text input, sets state to original rules
        else{
            const cpArray = destructureObject(resultRules) 
            const newArray = cpArray.filter(rule => { //Filters according to the text input
                return rule.toLowerCase().includes(text.toLowerCase())
            })
            setFilterText(newArray) //sets state to according to input
        }

    }

    return (
        <div>
            <h1>Rules</h1>
            <input type="text" name="search" placeholder="Serach by text...." onChange={onhandleChange} />
            <h3>{currentChapter}</h3>
            <ol>
            {filterText.length>0 ? filterText.map(rule => {
                return (
                    <div key={rule}>
                       <p className="Link" href="">{rule.substr(0,rule.indexOf(' '))}</p>
                       <p >{rule.substr(rule.indexOf(' '))}</p>
                     </div>
                     )
            }) : <p>No rules found.....</p>}
            </ol>

        </div>
    );
};

export default Rules;