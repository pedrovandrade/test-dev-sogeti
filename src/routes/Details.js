import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Details(props) {
  const uuid = useLocation().pathname.split('/')[2];
  const info = props.listData.find((obj) => obj.uuid === uuid) || {};

  return (
    <div className='list-container' >
    <div className='test'>
      <h1 className='list-title' >{info.title || 'No title'}</h1>
      <Link to={`/${props.pathPrefix}`} >
        <button id='back-button' ><div className='arrow' ></div>Back</button>
      </Link>
      </div>
      <p className='description' >{info.description || 'No description'}</p>
    </div>
  );
}
