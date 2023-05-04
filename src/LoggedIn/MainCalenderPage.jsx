import { useEffect, useState } from "react";
import { MainShell } from "../Calender/mainShell";
import { Events } from "../Events/events";
export function MainCalenderPage(props){
    let [date,setDate]=useState(new Date().toISOString().slice(0, 10) );
    
    function targetDate(e){
      setDate(e);
    }
  
    
    return (
      <div className="App">
       <MainShell  targetDate={(e)=>{targetDate(e)}}/>
        <Events id={props.id} date={date} />
      </div>
    );
}