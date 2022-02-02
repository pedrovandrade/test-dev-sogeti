import React, { useState } from 'react';
// import TodoList from 'components/TodoList.js';
import TodoList from './TodoList';

export default function App(props) {
  /** ******** REACT HOOKS ********* */
  const [listData, setListData] = useState(props.listData || []);
  
  return (
    <div className='list-container' >
      <h1 className='list-title' >My todo list</h1>

      <input type='text' placeholder='What do you want to do?' />
      <button id='add-button' onClick={() => console.log('Button clicked!')} >Add</button>

      <TodoList listData={listData} setListData={setListData} />
    </div>
  );
}
