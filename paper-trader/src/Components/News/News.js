import React, { useEffect, useState } from 'react';
import './News.css';
import NewsItem from '../NewsItem/NewsItem';

//------ API KEY: pub_69319e673e36cb9bdd4ccf3bd42d31c85255 -------

const News = (props) => {
  //state var to determine if news articles exist, if not hide the news tab
  const [exists, setExists] = useState(false)

  //new to have a const to store array of articles
  //may need to make one to hold each subset of the article
  const [articles, setArticles] = useState([]);

  //news takes in prop keyWord which is what the user wants to search for
  useEffect(() => {
    fetch("https://newsdata.io/api/1/news?apikey=pub_69319e673e36cb9bdd4ccf3bd42d31c85255&category=business&language=en&q=" + props.keyWord)
      .then(res => res.json())
      .then(
        (data) => {
          let tempArr = [];

          for (let i = 0; (i < data.results.length) && (i < 6); i++) {
            //doesnt push it if the desc, link, or title is null
            if (data.results[i].title !== null && data.results[i].description !== null && data.results[i].link != null) {
              tempArr.push(data.results[i])
            }
          }

          setArticles(tempArr)

          if (data.results.length > 1) {
            setExists(true)
          }
        }
      )
  }, [props.keyWord]);

  return (
    <>
      {exists &&
        <div className='news-container'>

          <div className='newsTitle'>News</div>

          {/* Content Starts Here */}
          <div className='news'>

            {/* Each News Article is Mapped to a News Item */}
            {articles.map((item) =>
              <NewsItem title={item.title} description={item.description.toString().substring(0, 200) + "..."} link={item.link} />
            )}

          </div>

        </div>
      }
    </>
  )
}

export default News