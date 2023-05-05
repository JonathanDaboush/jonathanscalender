import { useEffect, useState } from "react";
import axios from "axios";
import JSOG from "jsog";

export function Event(props) {
  let [category, setCategory] = useState(0);
  let [dateOfEvent, setDateOfEvent] = useState(new Date());
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
let [user,setUser]=useState(0);
  let submit = async(event) => {
    event.preventDefault(); 
    let path='http://localhost:8080/event';
    let userId=props.userId;
    let categoryId=category;
    if(props.e===undefined){
       // Check if event exists before calling preventDefault()
     
     let dateOfEvent=props.dateOf;
      await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name,userId, description, categoryId,dateOfEvent })
      })
        .then(res => {
          // handle response
        })
        .catch(function (error) {
          console.log(error.toString());
        });
    } else {
      path += "/exist";
      let id=props.e.id;
       // Check if event exists before calling preventDefault()
      fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id,userId,  name, description, categoryId ,dateOfEvent })
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
    if(props.e!=undefined){
      setCategory(props.e.category.id);
      setDateOfEvent(props.e.dateOfEvent);
      setDescription(props.e.description);
      setName(props.e.name);
    }
  }
  
  useEffect(()=>{initialize();return () => {}} , []);
  
  let Remove = async(event) => {
    await fetch('http://localhost:8080/event/'+props.e.id, {
      method: 'DELETE',
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  let handleChange = (event) => {
    const selectedId = event.target.value;
    setCategory(selectedId);
  };

  if (props.e && props.e.id !=undefined) {
    return (
      <div>
        <div>
          <form onSubmit={() => submit()}>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="dateOfEvent">
                Date Of Event:
              </label>
              <div className="col-sm-10">
              <input
                  type="date"
                  id="dateOfEvent"
                  className="dateOfEvent"
                  onChange={(e) => {
                      setDateOfEvent(e.target.value);
                  }}
                  value={dateOfEvent.toISOString().substring(0, 10)}
              />
              </div>
            </div>
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
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="category">
                Category:
              </label>
              <div className="col-sm-10">
                <select value={category} onChange={handleChange}>
                  {props.categories.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
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
              <label className="col-sm-2 col-form-label" htmlFor="dateOfEvent">
                Date Of Event:
              </label>
              <div className="col-sm-10">
                {props.dateOf}
              </div>
            </div>
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
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="category">
                Category:
              </label>
              <div className="col-sm-10">
                <select value={category} onChange={handleChange}>
                  {props.categories.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <input type="submit" value="Save" />
          </form>
        </div>
      </div>);
  }
}
