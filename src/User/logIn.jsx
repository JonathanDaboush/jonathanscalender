import { useEffect, useState } from "react";
import axios from "axios";
import JSOG from "jsog";

export function LogIn(props){
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [id,setId]=useState(-1);
    let submit=async()=>{
            let path = 'http://localhost:8080/user/'+email+'/'+password;
            await axios
              .get(path)
              .then((res) => {
                let target = "";
                target = JSOG.stringify(res.data);
                let newObject = JSOG.parse(target);
                setId(newObject.id);
                if(newObject.id !== -1){
                   props.login(newObject.id); 
                }
              })
              .catch(function (error) {
                console.log(error);
              });
    }
    return(
            <form onSubmit={submit}>
            <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="name">
                            Email:
                        </label>
                        <div className="col-sm-10">
                            <input
                            type="text"
                            id="email"
                            className="form-control"
                            name="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                            />
                        </div>
                        </div>
                        <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="name">
                            Password:
                        </label>
                        <div className="col-sm-10">
                            <input
                            type="text"
                            id="password"
                            className="form-control"
                            name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                            />
                        </div>
                        </div>
                        
                <input type="submit" value="Save" />
            </form>);
 
}
