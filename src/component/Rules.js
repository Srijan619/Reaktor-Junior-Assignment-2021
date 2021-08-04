import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router";

const Rules = () => {
    const location = useLocation();
    const allRules = location.state.slicedData.slicedRules


    const currentChapter = location.state.chapters

    let resultRules = allRules.filter(obj => {
        return (obj.chapter === currentChapter)
    })
    const [filterText, setFilterText] = useState([])
    const [searchKeyWord, setSearchKeyWord] = useState('');

    useEffect(() => {
        setFilterText(destructureObject(resultRules))
        handleSearch(searchKeyWord)
    }, [searchKeyWord]) // eslint-disable-line react-hooks/exhaustive-deps

    const destructureObject = (array) => {
        let pushA = [];
        array.forEach(rules => {
            rules.rule.forEach(rule => {
                pushA.push(rule)
            })
        })
        return pushA
    }
    const onhandleChange=(e)=>{
        setSearchKeyWord(e.target.value)
    }
    const handleSearch = (text) => {
        const delayDebounceFn = setTimeout(() => {
            searchTextInArray(text)
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }

    const searchTextInArray = (text) => {
        if(!text)setFilterText(destructureObject(resultRules))
        else{
            const cpArray = destructureObject(resultRules)
            const newArray = cpArray.filter(rule => {
                return rule.toLowerCase().includes(text.toLowerCase())
            })
            setFilterText(newArray)
        }

    }

    return (
        <div>
            <h1>Rules</h1>
            <input type="text" name="search" placeholder="Serach by text...." onChange={onhandleChange} />
            <h3>{currentChapter}</h3>
            <ul>
            {filterText.length>0 ? filterText.map(rule => {
                return (
                     <p key={rule}>{rule}</p>
                     )
            }) : <p>No rules found.....</p>}
            </ul>

        </div>
    );
};

export default Rules;