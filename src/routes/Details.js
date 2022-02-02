import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Details(props) {
  const uuid = useLocation().pathname.split('/')[2];
  const info = props.listData.find((obj) => obj.uuid === uuid);

  return (
    <div className='list-container' >
      <h1 className='list-title' >{info.title}</h1>
      <p className='description' >{info.description}</p>
    </div>
  );
}
