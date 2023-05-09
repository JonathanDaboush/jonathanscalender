import { useEffect, useState } from "react";
import axios from "axios";
import { Event } from "./event";

export function Events(props) {
  let [events, setEvents] = useState([]);
  let [counter, setCounter] = useState(0);

  let getList = async () => {
    let path = `http://localhost:8080/event/${props.id}/${props.date}`;
    try {
      let response = await axios.get(path, { responseType: 'json' });
      let data = response.data;
      setEvents(data);
    } catch (error) {
      console.log(error);
    }

   
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
    The Date:{props.date}
      <Event  userId={props.id} dateOf={props.date} update={() => setCounter(counter + 1)} />
      {events.map((e, i) => {
        return (
          <div key={i}>
            <div>
              <Event  update={()=>getList()} userId={props.id} event={e} dateOf={props.date}/>
            </div>
          </div>
        );
      })}
    </>
  );
};

