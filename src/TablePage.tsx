import {useEffect, useState} from "react";
import {API_BASE_URL} from "./constants";
import {Table} from "react-bootstrap";
import moment from "moment/moment";
import {Link, useNavigate, useParams} from "react-router-dom";

export function TablePage() {
  const navigate = useNavigate();
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
        {entities.map((entity : any, i) =>
          <tr key={i} onClick={() => navigate( 'edit/' + entity.id)}>
            {Object.values(entity).map((value, i) =>
              <td key={i}>{format(value)}</td>)}
          </tr>
        )}
        </tbody>
      </Table>
      <Link to='edit' state={entities[0]}>EDIT</Link>
      <br/>
      <Link to='/'>HOME</Link>
    </div>
  )
}
