import { useState } from "react";
import { Day } from "./day";
export function Week(props){
    let [list,setList]=useState(props.list);
   function getDay(e){
        props.getDay(e);
    }
    return(<tr>
        {list.map((e,i)=>{return(<td><Day number={e}  key={"day"+i} getDay={(e)=>getDay(e)}/></td>)})}
    </tr>);
}