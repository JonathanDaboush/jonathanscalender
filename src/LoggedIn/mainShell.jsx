import { useEffect, useState } from "react";
import { Edit } from "../User/editUser";
import { MainCalenderPage } from "./MainCalenderPage";

export function LoggedInMainShell(props) {
  let [isEdit, setIsEdit] = useState(false);
let [counter,setCounter]=useState(0);
  if (!isEdit) {
    return (<div>
      <MainCalenderPage id={props.id} />
      <button onClick={()=>setIsEdit(!isEdit)}>edit account</button>
    </div>);
  } else {
    return (<div>
      <Edit id={props.id} update={() => setCounter(counter + 1)}/>
      <button onClick={()=>setIsEdit(!isEdit)}>look at calender</button>
    </div>);
  }
}
