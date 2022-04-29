import React from 'react';
import './News.css';
import NewsItem from '../NewsItem/NewsItem';

//------ API KEY: pub_69319e673e36cb9bdd4ccf3bd42d31c85255 -------

const News = () => {
  return (
    <>
      <div className='news-container'>

        <div className='newsTitle'>News</div>

        {/* Content Starts Here */}
        <div className='news'>

          {/* Each News Article is Mapped to a News Item */}
          <NewsItem title="Article Title" description="Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."/>
          <NewsItem title="Article Title" description="Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."/>
          <NewsItem title="Article Title" description="Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."/>
          <NewsItem title="Article Title" description="Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."/>
          <NewsItem title="Article Title" description="Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."/>
          <NewsItem title="Article Title" description="Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."/>

        </div>

      </div>
    </>
  )
}

export default News