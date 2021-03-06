import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "./constants";
import AsyncSelect from "react-select/async";
import {useParams, useNavigate, Link} from "react-router-dom";
import {getType} from "./types";

export function EditPage() {
  const navigate = useNavigate();
  const {name, id} = useParams();
  const [obj, setObj] = useState<any>();
  const setState = (name: string, value: any) => {
    setObj({...obj!, [name]: value})
  }

  useEffect(() => {
    fetch(API_BASE_URL + name + '/' + id)
      .then(response => response.json())
      .then(object => setObj(object));
  }, []);

  async function getOptions(name : string) {
    let response = await fetch(API_BASE_URL + name);
    return (await response.json()).map((elem: any) => ({value: elem, label: elem.name}));
  }

  const renderField = (name: string, type: any) => {
    switch (type.constructor.name) {
      case 'String':
        return <input type='text' value={obj?.[name]} onChange={e => setState(name, e.target.value)}/>
      case 'number':
        return <input type='number' value={obj?.[name]} onChange={e => setState(name, e.target.value)}/>
      case 'Date':
        return <ReactDatePicker selected={obj?.[name] as Date} onChange={e => setState(name, e)}/>
      default:
        return <AsyncSelect
          onChange={e => setState(name, e)}
          value={obj?.[name]}
          cacheOptions
          defaultOptions
          loadOptions={() => getOptions(name)}/>
    }
  }
  const types = getType(name!);

  const send = () => {
    Object.keys(obj).map((key) => {
      obj[key] = obj[key].value ? obj[key].value : obj[key];
    });
    obj.id = parseInt(id!);
    console.log(obj)
    fetch(API_BASE_URL + name + '/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    });
    navigate('/' + name);
  }

  const del = () => {
    fetch(API_BASE_URL + name + '/' + id, {method: 'DELETE'});
    navigate('/' + name);
  }

  return (
    <div>
      {Object.entries(types!).map(([name, type]) =>
        <div key={name}>
          {name}:
          <br/>
          {renderField(name, type)}
        </div>)}
      <button onClick={send}>SUBMIT</button>
      <Link to={"/" + name}><button>BACK</button></Link>
      <button onClick={del}>DELETE</button>
    </div>
  )
}