import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from './routes/Details';
import axios from 'axios';

axios.get('/public/data/todo-list.json', { responseType: 'json' }).then((response) => {
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App listData={response.data} />} />
        <Route path='/details/*' element={<Details listData={response.data} />} />
        <Route path='*' element={
          <main><h2>Error 404</h2><p>URL not found</p></main>
        } />
      </Routes>
    </BrowserRouter>,
    document.getElementById('root'),
  );
}).catch((err) => {
  // throw new Error(err);
  const response = {
    "data": [
      {
        "title": "Do groceries",
        "state": "todo",
        "description": "Go to the supermarket and buy eggs, butter, sugar, fruits, soap and toillete paper",
        "uuid": "8348db18-83ba-11ec-a8a3-0242ac120002"
      },
      {
        "title": "Wash car",
        "state": "todo",
        "description": "Take the car to the gas station and leave it there for 30 minutes in the express washing",
        "uuid": "9c377382-83ba-11ec-a8a3-0242ac120002"
      },
      {
        "title": "Clean house",
        "state": "todo",
        "description": "Pass vaccum, clean the surfaces, clean the toillete and pass water on the floor",
        "uuid": "a081b5ec-83ba-11ec-a8a3-0242ac120002"
      }
  ]};

  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path='/test-dev-sogeti/' element={<App listData={response.data} />} />
        <Route path='/test-dev-sogeti/details/*' element={<Details listData={response.data} />} />
        <Route path='*' element={
          <main><h2>Error 404</h2><p>URL not found</p></main>
        } />
      </Routes>
    </BrowserRouter>,
    document.getElementById('root'),
  );
});
