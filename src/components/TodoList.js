import React, { useState } from 'react';
// import TodoItem from 'components/TodoItem';
import TodoItem from './TodoItem';

export default function TodoList(props) {
  const [listData, setListData] = useState(props.listData);

  function deleteItem() {
    console.log('Button clicked!');
  }

  function checkItem() {
    console.log('Checkbox clicked!');
  }

  return (
    <ul>
      {listData.map((item, index) => (
        <TodoItem
          data={item}
          checkItem={checkItem}
          deleteItem={deleteItem}
          key={index}
        />
      ))}
    </ul>
  );
}
