import {Link} from "react-router-dom";

export function Home() {
  const paths = ['management', 'sector', 'personnel', 'worker', 'brigade', 'object', 'work', 'resource', 'tech'];
  return(
    <div>
      {paths.map(path => <div key={path}><Link to={'/' + path}>{path}</Link><br/></div>)}
    </div>
  )
}