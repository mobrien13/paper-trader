import React from 'react'

const NewsItem = (props) => {
  return (
    <div className='news-item'>

        <h2 className='articleTitle'><a href={ props.link } target="_blank"> { props.title } </a></h2>
        <div className='articleDescription'> { props.description } </div>
    
    </div>
  )
}

export default NewsItem