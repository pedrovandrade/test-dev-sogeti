import React, { useState } from 'react';
// import TodoList from 'components/TodoList.js';
import TodoList from './TodoList';

export default function App(props) {
  /** ******** REACT HOOKS ********* */
  const [listData, setListData] = useState(props.listData || []);
  const [newTodo, setNewTodo] = useState('');

  function addTodo() {
    let newUuid = crypto.randomUUID();
    let alreadyExists = !!props.listData.find(item => item.uuid === newUuid);
    while (alreadyExists) {
      newUuid = crypto.randomUUID();
      alreadyExists = !!props.listData.find(item => item.uuid === newUuid);
    }

    setListData(oldArray => [...oldArray, {
      "title": newTodo,
      "state": "todo",
      "description": "",
      "uuid": newUuid
    }]);

    setNewTodo('');
  }

  return (
    <div className='list-container' >
      <h1 className='list-title' >My todo list</h1>
      <
        input
        type='text'
        placeholder='What do you want to do?'
        value={newTodo}
        onInput={(e) => setNewTodo(e.target.value)}
      />
      <button id='add-button' onClick={addTodo}>Add</button>
      <TodoList listData={listData} setListData={setListData} />
    </div>
  );
}
