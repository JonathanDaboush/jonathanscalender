import { useState,useEffect } from "react";
import { Select } from "semantic-ui-react";


export function PopBox(props){
    let [year,setYear]=useState(new Date().getFullYear());
    let [years,setYears]=useState([]);
    let [cycled,setCycled]=useState(false);

   function setTheSpan(){
     let list=years;
    for(let i=1900;i<2200;i++){
        list.push(i);
    }
    setYears(list);
    setCycled(true);
  }
  useEffect(() => {if(cycled){setTheSpan();} 
   },[]);

   function generateMonth(month){
        props.getDate(month,year);

   }

    return(
        <div>
            <h1>year:</h1>
            
            <button onClick={()=>{if(year>1899){let i=year-1;setYear(i)}}} > last year </button>
            <input type="number" value={year} onChange={(e)=>{let val=parseInt(e.target.value); if(val>1899 && val<2200){setYear(val);}}} />
            <button onClick={()=>{if(year<2200){let i=year+1;setYear(i)}}} >next year</button>

            <div>
                <button onClick={()=>generateMonth(1)}>January</button>
                <button onClick={()=>generateMonth(2)}>Febuary</button>
                <button onClick={()=>generateMonth(3)}>March</button>
                <button onClick={()=>generateMonth(4)}>April</button>
            </div>
            <div>
                <button onClick={()=>generateMonth(5)}>May</button>
                <button onClick={()=>generateMonth(6)}>June</button>
                <button onClick={()=>generateMonth(7)}>July</button>
                <button onClick={()=>generateMonth(8)}>August</button>
            </div>
            <div>
                <button onClick={()=>generateMonth(9)}>September</button>
                <button onClick={()=>generateMonth(10)}>October</button>
                <button onClick={()=>generateMonth(11)}>November</button>
                <button onClick={()=>generateMonth(12)}>December</button>
            </div>
           
        </div>
    );
}