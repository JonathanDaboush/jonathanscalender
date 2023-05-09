import { useEffect, useState } from "react";
import axios from "axios";
import JSOG from "jsog";

export function Event(props) {
  let [dateOfEvent, setDateOfEvent] = useState(new Date());
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
let [user,setUser]=useState(0);
let submit = async(event) => {
  if (event) {
    event.preventDefault(); 
  }

  let path='http://localhost:8080/event';
  let userId=props.userId;

  if(props.event===undefined){
    // Check if event exists before calling preventDefault()
    let dateOfEvent=props.dateOf;
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name,userId, description, dateOfEvent })
    })
      .then(res => {
        // handle response
      })
      .catch(function (error) {
        console.log(error.toString());
      });
  } else {
    let id=props.event.id;
    // Check if event exists before calling preventDefault()
    let dateOfEvent=props.dateOf;
    fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id,userId,  name, description, dateOfEvent })
    })
      .then(res => {
        // handle response
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

  
  
  let initialize = async() => {
    if(props.event!=undefined){
     
      setDescription(props.event.description);
      setName(props.event.name);
    }
  }
  
  useEffect(()=>{initialize();return () => {}} , []);
  
  let Remove = async(event) => {
    await fetch('http://localhost:8080/event/'+props.event.id, {
      method: 'DELETE',
    })
      .catch(function (error) {
        console.log(error);
      });

      props.update();
  }
  
  let handleChange = (event) => {
    const selectedId = event.target.value;
  };

  if (props.event && props.event.id !=undefined) {
    return (
      <div>
        <div>
          <form onSubmit={() => submit()}>
            
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="name">
                Name:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="description">
                Description:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  name="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </div>
            </div>
           
            <input type="submit" value="Save" />
          </form>
        </div>
        <div>
          <button onClick={() => Remove()}>Delete</button>
        </div>
      </div>
    );
  } else {
    return(
    <div>
        <div>
          <form onSubmit={() => submit()}>
           
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="name">
                Name:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="description">
                Description:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  name="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </div>
            </div>
          
            <input type="submit" value="Save" />
          </form>
        </div>
      </div>);
  }
}
