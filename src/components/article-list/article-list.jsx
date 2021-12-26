/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, {useState, useEffect, useCallback} from 'react';
import {Spin } from 'antd';
import ArticleHeader from '../article-header';
import Author from '../author';
import BlogApi from '../../services/blog-api';
import './article-list.css';

const api = new BlogApi();

const ArticleList = () => {
  const [posts, setPosts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [postsCount, setPostsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = useCallback(
    () => {
      api.getArticles()
        .then((result) => {
          console.log(result);
          setPosts(result.articles);
          setIsLoading(false);
          setPostsCount(result.articlesCount);
          return result;
        })
    },
    []
  );

  useEffect(() => {
    getPosts();
    setIsLoading(true);
  }, [getPosts]);


  const spin = isLoading ? <Spin /> : null;


  const postsData = posts !== [] && !spin ?
     posts.map((article, index) => {
          return (
            <li key={index} className="post-container">
              <div className="header">
                <div className="article">
                  <ArticleHeader {...article} />
                  </div>
                  <Author author={article.author} createdAt={article.createdAt} />
                  </div>
            </li>
          );
        }) : null;
  

  return (

    <div className="main">
      <ul className="blog-posts">
        {spin}
        {postsData}

      </ul>
   
    </div>
  )
}


export default ArticleList;