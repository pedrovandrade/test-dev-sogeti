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
  throw new Error(err);
});
