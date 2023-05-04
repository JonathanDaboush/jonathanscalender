import { useEffect, useState } from "react";
import axios from "axios";
import JSOG from "jsog";

export function LogIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/user/${email}/${password}`);
      const data = await response.text();
      if (data !== "-1") {
        const parsedData = JSON.parse(data);
        props.logIn(parsedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            id="password"
            className="form-control"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}
