import React from 'react';
import './News.css';

//------ API KEY: pub_69319e673e36cb9bdd4ccf3bd42d31c85255 -------

const News = () => {
  return (
    <>
      <div className='news-block'>
        <div className='list-title'>News</div>
        <div className='news'>
          <div className='news-item'>News Item 1</div>
          <div className='news-item'>News Item 2</div>
          <div className='news-item'>News Item 3</div>
          <div className='news-item'>News Item 4</div>
          <div className='news-item'>News Item 5</div>
          <div className='news-item'>News Item 6</div>
        </div>
      </div>
    </>
  )
}

export default News