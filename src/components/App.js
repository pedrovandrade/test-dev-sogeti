import React from 'react';
// import TodoList from 'components/TodoList.js';
import TodoList from './TodoList';

const myListData  = [
  {
    title: 'Do groceries',
    state: 'todo',
    description: 'Go to the supermarket and buy eggs, butter, sugar, fruits, soap and toillete paper'
  },
  {
    title: 'Wash car',
    state: 'todo',
    description: 'Take the car to the gas station and leave it there for 30 minutes in the express washing'
  },
  {
    title: 'Clean house',
    state: 'todo',
    description: 'Pass vaccum, clean the surfaces, clean the toillete and pass water on the floor'
  }
];

export default function App() {
  return (
    <div className='list-container' >
      <h1 className='list-title' >My todo list</h1>

      <input type='text' placeholder='What do you want to do?' />
      <button id='add-button' onClick={() => console.log('Button clicked!')} >Add</button>

      <TodoList listData={myListData} />
    </div>
  );
}
