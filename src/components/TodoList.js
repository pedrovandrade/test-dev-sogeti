import React, { useState, useEffect } from 'react';
// import TodoItem from 'components/TodoItem';
import TodoItem from './TodoItem';

export default function TodoList(props) {
  /** ******** REACT HOOKS ********* */
  const [listData, setListData] = useState(props.listData);

  useEffect(() => {
    console.log('listData:', listData);
  }, [listData]);

  function deleteItem() {
    console.log('Button clicked!');
  }

  return (
    <ul>
      {listData.map((item, index) => (
        <TodoItem
          data={item}
          deleteItem={deleteItem}
          listData={listData}
          setListData={setListData}
          index={index}
          key={index}
        />
      ))}
    </ul>
  );
}
