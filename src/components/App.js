import React, { useState } from 'react';
// import TodoList from 'components/TodoList.js';
import TodoList from './TodoList';

/**
 * Generates a random UUID, either with the new crypto.randomUUID native method
 * or with a (less robust) Math.random solution
 */
function generateUUID() {
  try {
    return crypto.randomUUID();
  } catch { // In case crypto.randomUUID is not found
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }
}

export default function App(props) {
  /** ******** REACT HOOKS ********* */
  const [newTodo, setNewTodo] = useState('');

  function addTodo() {
    if (newTodo === '') return; // Don't insert an empty string

    let newUuid = generateUUID();
    let alreadyExists = !!props.listData.find(item => item.uuid === newUuid);
    while (alreadyExists) {
      newUuid = generateUUID();
      alreadyExists = !!props.listData.find(item => item.uuid === newUuid);
    }

    props.setListData(oldArray => [{
      "title": newTodo,
      "state": "todo",
      "description": "",
      "uuid": newUuid
    }, ...oldArray]);

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
      <TodoList listData={props.listData || []} setListData={props.setListData} />
    </div>
  );
}
