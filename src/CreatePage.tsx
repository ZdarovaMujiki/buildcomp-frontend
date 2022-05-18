import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";
import {API_BASE_URL} from "./constants";
import AsyncSelect from "react-select/async";
import {useParams, useNavigate, Link} from "react-router-dom";
import {getType} from "./types";

export function CreatePage() {
  const navigate = useNavigate();
  const {name} = useParams();
  const [obj, setObj] = useState<any>();
  const setState = (name: string, value: any) => {
    setObj({...obj!, [name]: value})
  }

  async function getOptions(name : string) {
    let response = await fetch(API_BASE_URL + name);
    return (await response.json()).map((elem: any) => ({value: elem, label: elem.name}));
  }

  const renderField = (name: string, type: any) => {
    switch (type.constructor.name) {
      case 'String':
        return <input type='text' onChange={e => setState(name, e.target.value)}/>
      case 'number':
        return <input type='number' onChange={e => setState(name, e.target.value)}/>
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
    fetch(API_BASE_URL + name + '/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    });
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
    </div>
  )
}