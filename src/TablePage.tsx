import {useEffect, useState} from "react";
import {API_BASE_URL} from "./constants";
import {Table} from "react-bootstrap";
import {AddButton} from "./AddButton/AddButton";
import moment from "moment/moment";
import {useParams} from "react-router-dom";

export function TablePage() {
  const [entities, setEntities] = useState([]);
  const { name } = useParams();
  useEffect(() => {
    fetch(API_BASE_URL + name)
      .then(response => response.json())
      .then(json => setEntities(json));
  }, [])

  function format(value : any) {
    let date = moment(value, moment.ISO_8601, true);
    if (date.isValid()) {
      return date.toDate().toLocaleDateString()
    }
    else if (typeof value === 'object') {
      return value?.name;
    }
    return value;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
        <tr>
          {entities.length > 0 ? Object.keys(entities[0]).map(key => <th key={key}>{key}</th>) : null}
        </tr>
        </thead>
        <tbody>
        {entities.map((entity, i) =>
          <tr key={i}>
            {Object.values(entity).map((value, i) =>
              <td key={i}>{format(value)}</td>)}
          </tr>
        )}
        </tbody>
      </Table>
      <AddButton/>
    </div>
  )
}
