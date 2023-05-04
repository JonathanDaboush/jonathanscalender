import react,{ useState } from "react";

export function Day(props){
    function getDay(){
        props.getDay(props.number);
    }
    return(
        <div>
            <a onClick={getDay}>
            {props.number}
            </a>
        </div>
    );
}