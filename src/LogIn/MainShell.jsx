import { useState,useEffect } from "react";
import { CreateNewUser } from "../User/createUser";
import { LogIn } from "../User/logIn";

export function LogInMainShell(props) {
    let [id, setId] = useState(-1);
    let [newUser, setNewUser] = useState(false);
  let [counter,setCounter]=useState(0);
    useEffect(() => {
      if (id !== -1) {
        props.getId(id);
      }
    }, [id, props]);
  
    if (newUser) {
      return (
        <div>
          <LogIn logIn={(e) => setId(e)} />
          <button onClick={() => setNewUser(!newUser)}>Update User</button>
        </div>
      );
    } else {
      return (
        <div>
          <CreateNewUser update={()=>{setCounter(counter++)}}/>
          <button onClick={() => setNewUser(!newUser)}>Sign In</button>
        </div>
      );
    }
  }
  