import React, { useEffect, useState } from 'react';

const cors_bypasser="https://cors-anywhere.herokuapp.com/"
const url="https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"

const TableOfContent = () => {
    const [tableOfContent,setTableOfContent]=useState('')
    useEffect(()=>{
        const fetchData =async()=>{
            const data= await getText(cors_bypasser+url); 
            setTableOfContent(data)
        }
     fetchData()
     sliceTableOfContent()
  
    })
    const sliceTableOfContent=()=>{
        const sliced=tableOfContent.split("Contents")[1]
        console.log(sliced)
  
    }
    async function getText(url){
      
        return await fetch(url)
        .then(r=>r.text())
      
    }
    return (
        <div>
            <h1>Table of Contents</h1>
        </div>
    );
};

export default TableOfContent;