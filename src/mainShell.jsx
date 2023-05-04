import { LogInMainShell } from "./LogIn/MainShell";
import { useEffect, useState } from "react";
import { LoggedInMainShell } from "./LoggedIn/mainShell";
export function MainShell(props){
    let [id,setId]=useState(-1);

    if(id==-1){
       return(<LogInMainShell getId={(e)=>setId(e)} />);
    }
    else{
        return(<LoggedInMainShell id={id} />);
    }
}