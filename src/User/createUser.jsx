import { useEffect, useState } from "react";
import axios from "axios";
import JSOG from "jsog";

export function CreateNewUser(props){
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let submit=async()=>{
let isTrue=false;
            try{
                let user;
                let path = 'http://localhost:8080/user/getByEmail'+email;
                await axios
                .get(path)
                .then((res) => {
                  let target = "";
                  target = JSOG.stringify(res.data);
                  let newObject = JSOG.parse(target);
                  user=newObject;
                })
                .catch(function (error) {
                  console.log(error);
                });
                if(user.id){
                    isTrue=true;}
            }
            catch{
                
            }
            if(isTrue){
            let path = 'http://localhost:8080/user/';
            axios.post(
                path,{ email:email,password:password})
              .then((res) => {

              })
              .catch(function (error) {
                console.log(error);
              });
           props.update(); }
           else{
            alert("account with said email already exists.");
           }
        
    }
    return(
            <form onSubmit={submit}>
            <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="name">
                            Email:
                        </label>
                        <div className="col-sm-10">
                            <input
                            type="email"
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