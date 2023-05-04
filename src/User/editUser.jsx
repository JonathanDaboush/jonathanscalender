import { useEffect, useState } from "react";
import axios from "axios";
import JSOG from "jsog";

export function Edit(props){
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");

    let initialize = async () => {
        let path = 'http://localhost:8080/user/getById/' + props.id;
        await fetch(path)
          .then((res) => res.json())
          .then((data) => {
            setEmail(data.email);
            setPassword(data.password);
          })
          .catch(function (error) {
            alert(error.message);
            console.log(error);
          });
    };

    useEffect(() => {
        initialize();
    }, []);

    let submit = async (e) => {
        e.preventDefault();
        let path = 'http://localhost:8080/user';
        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: props.id, email: email, password: password })
        })
          .then((res) => {
            props.update();
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
        </form>
    );
}
