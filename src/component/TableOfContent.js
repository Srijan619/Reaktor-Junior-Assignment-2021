import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

const cors_bypasser = "https://cors-anywhere.herokuapp.com/"
const url = "https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"



const TableOfContent = () => {

    const [tableOfContent, setTableOfContent] = useState('')
    const [slicedTableOfContent, setSlicedTableOfContent] = useState([])
    const [slicedDetails, setSlicedDetails] = useState('')
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getText(cors_bypasser + url);
            setTableOfContent(data)
        }
        fetchData()

        setSlicedTableOfContent(sliceTableOfContent())
        sliceDetail()

    }, [tableOfContent])

    const sliceTableOfContent = () => {
        const contentsIndex = tableOfContent.indexOf("Contents") + 8//Hard coded 8 remove it later for length of contents
        const glossaryIndex = tableOfContent.indexOf("Glossary");
        const sliced = tableOfContent.slice(contentsIndex, glossaryIndex)

        let newObj = sliced.split('\n')
        let refinedObj = [];
        let refinedOriginal = [];
        const regNumberandDot = /^\d\.\s[a-zA-Z].*$/ //Regex expression to get title of the section only

        newObj.map(item => {
            let removeLineBreak = item.replace(/(\r\n|\n|\r)/gm, "")

            if (removeLineBreak !== "") {
                refinedOriginal.push(removeLineBreak)

                if (regNumberandDot.test(removeLineBreak.toString())) {
                    refinedObj.push(removeLineBreak)
                }
            }
        })
        let titleAndChapter =[]
        for (var i = 0; i<9; i++) {
            let firstChar = refinedObj[i]
            let firstIndex = refinedOriginal.indexOf(firstChar)
            let secondIndex = refinedOriginal.indexOf(refinedObj[i+1])

            let slicedData=refinedOriginal.slice(firstIndex + 1, secondIndex)
            let tAc={firstChar,slicedData}
            titleAndChapter.push({
                title:firstChar,
                chapter:slicedData
            })
        }
        console.log(titleAndChapter)
        return titleAndChapter;
    }

    const sliceDetail = () => {
        // const creditsIndex = tableOfContent.indexOf("Credits") + 7
        // const glossaryIndex = tableOfContent.lastIndexOf("Glossary")
        // const sliced = tableOfContent.slice(creditsIndex, glossaryIndex)
        //setSlicedDetails(sliced)
        //console.log((sliced))
        const contentsIndex = tableOfContent.indexOf("Contents") + 8//Hard coded 8 remove it later for length of contents
        const glossaryIndex = tableOfContent.indexOf("Glossary");
        const sliced = tableOfContent.slice(contentsIndex, glossaryIndex)

        let newObj = sliced.split('\n')
        //console.log(newObj)
        const toc = sliceTableOfContent()
        toc.map(item => {
            //console.log(item)

        })



    }
    async function getText(url) {

        return await fetch(url)
            .then(r => r.text())

    }
    return (
        <div >
            <h1>Table of Contents</h1>
            {(slicedTableOfContent?slicedTableOfContent.map(data => {
                return(
                    <p key={data.title}>
                         {console.log(data)}
                      <a href="" onClick={()=>history.push('/'+data.title,{data})}>{data.title}</a>
                      <br/>
                      <br/>

                </p>
                )
            
          
            }):<></>)}

        </div>
    );
};

export default TableOfContent;