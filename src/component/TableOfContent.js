import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import '../App.css';

const cors_bypasser = "https://cors-anywhere.herokuapp.com/"
const url = "https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"



const TableOfContent = () => {

    const [tableOfContent, setTableOfContent] = useState('')
    const [slicedTableOfContent, setSlicedTableOfContent] = useState([])
    const [slicedRules, setSlicedRules] = useState([])
    const history = useHistory();

    async function getText(url) {
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
        const contentsIndex = tableOfContent.indexOf("Contents") + 8//Hard coded 8 remove it later for length of contents
        const glossaryIndex = tableOfContent.indexOf("Glossary");
        const sliced = tableOfContent.slice(contentsIndex, glossaryIndex)
        let newObj = sliced.split('\n')
        let refinedObj = [];
        let refinedOriginal = [];
        const regNumberandDot = /^\d\.\s[a-zA-Z].*$/ //Regex expression to get title of the section only

        newObj.forEach(item => {
            let removeLineBreak = item.replace(/(\r\n|\n|\r)/gm, "")
            if (removeLineBreak !== "") {
                refinedOriginal.push(removeLineBreak)

                if (regNumberandDot.test(removeLineBreak.toString())) {
                    refinedObj.push(removeLineBreak)
                }
            }
        })
        let titleAndChapter = []
        for (var i = 0; i < refinedObj.length; i++) {
            let firstChar = refinedObj[i]
            let firstIndex = refinedOriginal.indexOf(firstChar)
            let secondIndex = refinedOriginal.indexOf(refinedObj[i + 1])

            let slicedData = refinedOriginal.slice(firstIndex + 1, secondIndex)
            titleAndChapter.push({
                title: firstChar,
                chapter: slicedData
            })
        }
        return titleAndChapter;
    }

    const sliceRules = () => {
        const creditsIndex = tableOfContent.indexOf("Credits") + 7
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
        const slicedTOC = sliceTableOfContent()
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
        return chapterAndRules
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