import React from 'react';
import './Box.css';

const Box = (props) => {
  return (
    <>
        <div className='box'>
            { props.children }
        </div>
    </>
  )
}

export default Box