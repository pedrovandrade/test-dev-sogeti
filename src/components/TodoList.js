import React from 'react';
// import TodoItem from 'components/TodoItem';
import TodoItem from './TodoItem';

export default function TodoList(props) {
  function deleteItem() {
    console.log('Button clicked!');
  }

  return (
    <ul>
      {props.listData.map((item, index) => (
        <TodoItem
          data={item}
          deleteItem={deleteItem}
          listData={props.listData}
          setListData={props.setListData}
          index={index}
          key={index}
        />
      ))}
    </ul>
  );
}
