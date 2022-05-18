import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./Home";
import {TablePage} from "./TablePage";
import {CreatePage} from "./CreatePage";
import {EditPage} from "./EditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/:name" element={<TablePage/>}/>
        <Route path="/:name/edit" element={<CreatePage/>}/>
        <Route path="/:name/edit/:id" element={<EditPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
