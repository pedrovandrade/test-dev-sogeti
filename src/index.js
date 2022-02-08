import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from './routes/Details';
import axios from 'axios';

/**
 * Wrapper component function to make the same stateful data among the pages
 * @param {object} props - props object:
 * @param {string} props.pathPrefix- The home page prefix (for GitHub Pages)
 * @param {array} props.apiData- The mock JSON API array with the list data
 */
function Wrapper(props) {
  const [listData, setListData] = useState(props.apiData);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/${props.pathPrefix}`} element={<App listData={listData} setListData={setListData} />} />
        <Route path='/details/*' element={<Details listData={listData} pathPrefix={props.pathPrefix} />} />
        <Route path='*' element={
          <main><h2>Error 404</h2><p>URL not found</p></main>
        } />
      </Routes>
    </BrowserRouter>
  );
}

axios.get('/public/data/todo-list.json', { responseType: 'json' }).then((response) => {
  ReactDOM.render(
    <Wrapper pathPrefix='' apiData={response.data} />,
    document.getElementById('root'),
  );
}).catch(() => { // For GitHub Pages
  const githubAddress = 'https://raw.githubusercontent.com/pedrovandrade/test-dev-sogeti/main/public/data/todo-list.json';
  axios.get(githubAddress, { responseType: 'json' }).then((response) => {
    ReactDOM.render(
      <Wrapper pathPrefix='test-dev-sogeti/' apiData={response.data} />,
      document.getElementById('root'),
    );
  });
});
