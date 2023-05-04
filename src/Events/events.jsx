import { useEffect,useState} from "react";
import axios from "axios";
import JSOG from "jsog";
import { Event } from "./event";

export function Events(props) {
  let [events, setEvents] = useState([]);
  let [counter, setCounter] = useState(0);
let[categories,setCategories] =useState([]);
  let getList = async () => {
    let path = 'http://localhost:8080/event/'+props.id+'/'+props.date;
    await axios
      .get(path)
      .then((res) => {
        let list = [];
        let target = "";
        target = JSOG.stringify(res.data);
        let newObject = JSOG.parse(target);
        for (var i = 0; i < newObject.length; i++) {
          list.push(newObject[i]);
        }
        setEvents(list);
      })
      .catch(function (error) {
        console.log(error);
      });
      path = 'http://localhost:8080/category';
    await axios
      .get(path)
      .then((res) => {
        let list = [];
        let target = "";
        target = JSOG.stringify(res.data);
        let newObject = JSOG.parse(target);
        for (var i = 0; i < newObject.length; i++) {
          list.push(newObject[i]);
        }
        setCategories(list);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      {events.map((e, i) => {
        return (
          <div key={i}>
            <div>
              <Event categories={categories} event={e} update={()=>(setCounter(counter++))}/>
            </div>
          </div>
        );
      })}
    </>
  );
};

