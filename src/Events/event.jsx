import { useEffect, useState } from "react";
import axios from "axios";
import JSOG from "jsog";

export function Event(props) {
  let [category, setCategory] = useState(0);
  let [dateOfEvent, setDateOfEvent] = useState(new Date());
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");

  let submit = async(event) => {
    let path='http://localhost:8080/event/';
    if(props.e.id===undefined){

        event.preventDefault();
      await  axios.post(path, {
        name:name,description:description,description:description,categoryId:category
              })
            .then(res => {
               
            }).catch(
            function (error) {
            console.log(error.toString());
            });
    }
    else{
        path+="/exist";
        event.preventDefault();
        axios.post(
            path,{ id: props.e.id ,name:name,description:description,description:description,categoryId:category})
            .then(res => {
              
            }).catch(
            function (error) {
            console.log(error);
            });
    }
  };
let initialize=async()=>{
    if(props.e){
        setCategory(props.e.category.id);
        setDateOfEvent(props.e.dateOfEvent);
        setDescription(props.e.description);
        setName(props.e.name);
    }
}
useEffect(initialize, []);

 let Remove=async(event)=>{
   
    await axios.delete('http://localhost:8080/event/'+props.e.id).catch(
        function (error) {
            console.log(error);
        });
    props.update();
}

  let handleChange = (event) => {
    const selectedId = event.target.value;
    setCategory(selectedId);
  };

  if (props.e.id) {
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
                  value={dateOfEvent}
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
                <input
                  type="date"
                  id="dateOfEvent"
                  className="dateOfEvent"
                  onChange={(e) => {
                    setDateOfEvent(e.target.value);
                  }}
                  value={dateOfEvent}
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
      </div>);
  }
}
