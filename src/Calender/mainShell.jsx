import { useState,useEffect } from "react";
import { Calender } from "./calender";
import { PopBox } from "./PopBox";
export function MainShell(props){
    let [month,setMonth]=useState(new Date().getMonth()+1);
    let [year,setYear]=useState(new Date().getFullYear());
    let [edit,setEdit]=useState(false);
    const monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    
  function getDate(thismonth,thisyear){
    setMonth(thismonth);
    setYear(thisyear);
    setEdit(false);
  }
function targetDate(date){
    props.targetDate(date);
}

if(month!=-1&&edit==false){
    return(<div>
        <div>{monthNames[month]},{year}</div>
        <Calender year={year} month={month} getDateTarget={(e)=>{targetDate(e)}} />
        <button onClick={()=>{setEdit(true)}}>edit</button>
    </div>)}
    else if(month!=-1&&edit){
        return(<div>
            
            <PopBox getDate={(month,year)=>{getDate(month,year)}}/>
            <button onClick={()=>{setEdit(false)}}>calender</button>
        </div>)}
    else{
        return(<div></div>);
    }
}