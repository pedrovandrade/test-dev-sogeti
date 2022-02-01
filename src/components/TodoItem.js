import React from 'react';

export default function TodoItem(props) {

  return (
    <li>
      <label>
        <input type='checkbox' onChange={props.checkItem} />
        <div className='todo-item' >{props.data.title}</div>
        <button className='delete-button' type='button' onClick={props.deleteItem} ></button>
      </label>
    </li>
  );
}
