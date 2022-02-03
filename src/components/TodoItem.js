import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function TodoItem(props) {
  /** ******** REACT HOOKS ********* */
  const [done, setDone] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  function checkItem(event) {
    if (event.target.checked) {
      setDone(true);
    } else {
      setDone(false);
    }
  }

  /** ******** REACT EFFECTS ******** */
  // Page load
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // Throw the checked item at the bottom of the list if done or at the top if
  // it's still to do
  useEffect(() => {
    if (!pageLoaded) return; // To prevent useEffect calls from page load
    
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
          <Link to={`/details/${props.data.uuid}`} style={{ color: 'black', textDecoration: 'none' }}>
            <div className={`todo-item${props.data.state === 'done' ? ' checked' : ''}`}>{props.data.title}</div>
          </Link>
          <button className='delete-button' type='button' onClick={props.deleteItem} ></button>
        </label>
      </li>
    );
}
