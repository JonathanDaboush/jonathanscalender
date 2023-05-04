import { useEffect,useState } from "react";
import { Week } from "./week";

export  function Calender(props){
    let [month,setMonth]=useState(props.month);
    let [year,setYear]=useState(props.year);
    let [currentCalender,setCurrentCalender]=useState([]);

    const daysOfMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

 function dayOfWeek(month, year){
        //solution founded in this video:https://www.youtube.com/watch?v=wGZ1uPj6m7Q&t=165s
        
        //take away the centuries
        let yearOfFocus=year%100;
        let isLeapYear=false;
        if(yearOfFocus%4==0){
            isLeapYear=true;
        }
        let monthCode=[[6,5],[2,1],[2],[5],[0],[3],[5],[1],[4],[6],[2],[4]];
        let specificCode=-1;
        
        //how to calculate day


    //find the code of the month
        if((month==1||month==2)&&isLeapYear){
            specificCode=monthCode[month-1][1];
        }
       else{
            specificCode=monthCode[month-1][0];
        }

        // 0 and 7 is sunday so monday 1

        //year code spanning from 1900-2199
        let bonusYearCode=0;
        if(year/100==19){
          bonusYearCode=1;
        }
        else if(year/100==21){
            bonusYearCode=5;
       }

       let yearCode=yearOfFocus+Math.trunc((yearOfFocus*0.25));

       yearCode=(yearCode%7)+bonusYearCode;

        return ((specificCode+1+yearCode)%7);
       

    
    }
    function firstWeek(day,week){
        let currentWeek=[];
        let lastMonth=month-2;
        if(lastMonth<0){
           lastMonth=daysOfMonth[12];
        }
        else{
            lastMonth=daysOfMonth[lastMonth];
        }
        let digit=0;
        for(let i=day-1;i>=0;i--){
            week.unshift(lastMonth-digit);
            digit++;
        }
        return week;
    }
    function lastWeek(calender){
        let nextDay=1;
        let week=calender[calender.length-1];
        for(let i=week.length;i<7;i++){
           week.push(nextDay); 
           nextDay++;
        }
       
        return week;
    }
    function getCalender(day){
        let calender=[];
        let week=[];
        if(day!=1&& calender.length < 1){
                week=firstWeek(day,week);
            }
            let limit=daysOfMonth[month-1];
        for(let i=0;i<limit;i++){
           if(week.length==7 ){
            calender.push(week);
            week=[];
           }
           week.push(i+1);

        }
        if(week.length>0){
            calender.push(week);
        }
        if(calender[calender.length-1].length<7){
           week=lastWeek(calender);
           calender[calender.length-1]=week;
        }
       
       setCurrentCalender(calender);
    }
    function getDay(e){
     let date;
       if(month<10){
        date=new Date( year+"/0"+ month+"/"+e );
       }
       else{
        date=new Date( year+"/"+ month+"/"+e );
       } 
       props.getDateTarget(date);
    }
    useEffect(() => {
      
        
       let day= dayOfWeek(month,year);
        getCalender(day); 
      },[]);

    return(
        <table id="calender">
        <thead>
             <tr id="calender header">
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                
            </tr></thead>
            <tbody >
            {currentCalender.map((e,i)=>{return(<Week list={e}  key={"week"+i} getDay={getDay} />)})}</tbody>
        </table>
    );
}