import React, { useState, useEffect } from 'react';

export default function TodoItem(props) {
  /** ******** REACT HOOKS ********* */
  const [done, setDone] = useState(false);

  function checkItem(event) {
    if (event.target.checked) {
      setDone(true);
    } else {
      setDone(false);
    }
  }

  /** ******** REACT EFFECTS ******** */
  // Throw the checked item at the bottom of the list if done or at the top if
  // it's still to do
  useEffect(() => {
    const index = props.index;
    const checkedElem = props.listData[index];
    if (done) {
      checkedElem.state = 'done';
      const newArray = props.listData.filter((elem) => {
        return elem !== props.listData[index];
      }).concat(checkedElem);
      props.setListData(newArray);
    } else {
      checkedElem.state = 'todo';
      const newArray = [checkedElem].concat(props.listData.filter((elem) => {
        return elem !== props.listData[index];
      }));
      props.setListData(newArray);
    }
  }, [done]);

  // Change the corresponding checkbox state when a list element is displaced
  useEffect(() => {
    const index = props.index;
    if (props.listData[index].state === 'done') {
      setDone(true);
    } else {
      setDone(false);
    }
  }, [props.listData]);

  return (
    <li>
      <label>
        <input type='checkbox' onChange={checkItem} checked={props.data.state === 'done'} />
        <div className={`todo-item${props.data.state === 'done' ? ' checked' : ''}`} onClick={(e) => e.preventDefault()}>{props.data.title}</div>
        <button className='delete-button' type='button' onClick={props.deleteItem} ></button>
      </label>
    </li>
  );
}
