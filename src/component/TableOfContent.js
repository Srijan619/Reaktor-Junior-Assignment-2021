import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import '../App.css';

const cors_bypasser = "https://cors-anywhere.herokuapp.com/"  // Cors Bypasser
const url = "https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt" //Url to get the text



const TableOfContent = () => { //Main function
    const [tableOfContent, setTableOfContent] = useState('') //Set table of content data
    const [slicedTableOfContent, setSlicedTableOfContent] = useState([])
    const [slicedRules, setSlicedRules] = useState([])
    const history = useHistory(); //used to navigate

    async function getText(url) { //Function to get text from the url
        return await fetch(url)
            .then(r => r.text())
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await getText(cors_bypasser + url);
            setTableOfContent(data)

        }
        fetchData()
        setSlicedTableOfContent(sliceTableOfContent())
        setSlicedRules(sliceRules())

    }, [tableOfContent])// eslint-disable-line react-hooks/exhaustive-deps


    const sliceTableOfContent = () => {
        const contents="Contents"
        const contentsIndex = tableOfContent.indexOf(contents)+contents.length //First index to slice from
        const glossaryIndex = tableOfContent.indexOf("Glossary"); //Second index to slice the fata
        const sliced = tableOfContent.slice(contentsIndex, glossaryIndex) // sliced data

        let newObj = sliced.split('\n') //Split by new line
        let refinedObj = []; //contains refined titles for TOC
        let refinedOriginal = []; //Contains all refined including titles and chapters
        const regNumberandDot = /^\d\.\s[a-zA-Z].*$/ //Regex expression to get title of the section only for example 1. General is valid here
 
        newObj.forEach(item => {  //Map through the object
            let removeLineBreak = item.replace(/(\r\n|\n|\r)/gm, "") //replace line break with empty string
            if (removeLineBreak !== "") {
                refinedOriginal.push(removeLineBreak)
                if (regNumberandDot.test(removeLineBreak.toString())) { //checks if it passes regex
                    refinedObj.push(removeLineBreak)
                }
            }
        })
        let titleAndChapter = []
        for (var i = 0; i < refinedObj.length; i++) {
            let firstTitle = refinedObj[i] //Gets first title from TOC
            let firstIndex = refinedOriginal.indexOf(firstTitle) //Index of first Title
            let secondIndex = refinedOriginal.indexOf(refinedObj[i + 1]) //Second index of next Title

            let slicedData = refinedOriginal.slice(firstIndex + 1, secondIndex) //Slices chapters from first title till next title
             
            titleAndChapter.push({
                title: firstTitle,
                chapter: slicedData
            })
        }
        return titleAndChapter; //returns object of title and chapter
    }

    const sliceRules = () => {
        const credits="Credits"
        const creditsIndex = tableOfContent.indexOf(credits)+credits.length
        const glossaryIndex = tableOfContent.lastIndexOf("Glossary")
        const sliced = tableOfContent.slice(creditsIndex, glossaryIndex)
        let newObj = sliced.split('\n')

        let refinedOriginal = [];
        newObj.forEach(item => {
            let removeLineBreak = item.replace(/(\r\n|\n|\r)/gm, "")
            if (removeLineBreak !== "") {
                refinedOriginal.push(removeLineBreak)

            }
        })
        let chapterAndRules = []
        const slicedTOC = sliceTableOfContent() //Get title and chapter from another function

        slicedTOC.forEach(item => {
            if (item.chapter) {
                for (let i = 0; i < item.chapter.length; i++) {
                    let firstChapter = item.chapter[i]
                    let firstIndex = refinedOriginal.indexOf(firstChapter)
                    let secondIndex = refinedOriginal.indexOf(item.chapter[i + 1])
                    let slicedData = refinedOriginal.slice(firstIndex + 1, secondIndex)
                    chapterAndRules.push({
                        chapter: firstChapter,
                        rule: slicedData
                    })
                }
            }

        })
        return chapterAndRules //Return Chapter and its relevant rules
    }

    return (
        <div >
            <h1>Table of Contents</h1>
            <ul>
            {(slicedTableOfContent && slicedRules.length > 0 ? slicedTableOfContent.map(data => {
                return (
                    <li key={data.title} onClick={() => history.push('/' + data.title, { data, slicedRules })}>{data.title}</li>
                )
            }) : <p>Loading....</p>)}
            </ul>

        </div>
    );
};

export default TableOfContent;