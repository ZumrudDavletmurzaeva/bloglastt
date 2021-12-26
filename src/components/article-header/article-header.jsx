/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import Tag from '../tag';
import Favorite from '../favorite';
import BlogApi from '../../services/blog-api';
import './article-header.css';
import { SignContext } from '../signContext';

const api = new BlogApi();

const ArticleHeader = ({title,favoritesCount, description,  tagList, slug, favorited}) => {


  const signContext = useContext(SignContext);
  const { user, setUser } = signContext;

  const [isFavorited, setFavorited] = useState(favorited);
  const [favorites, setFavorites] = useState(favoritesCount);

  const likeArticle = async () => {
    const { token } = user;
    if (isFavorited) {
      const unfavorited = await api.unfavoriteArticle(token, slug);
      if (unfavorited) {
        setFavorited(false);
        setFavorites(favorites - 1);
      }
    } else {
      const favorited = await api.favoriteArticle(token, slug);
      if (favorited) {
        setFavorited(true);
        setFavorites(favorites + 1);
      }
    }
  };

  return (
    <div className="article">

      <div className="title-container">

      <Link to={`/articles/${slug}`}>
          <div className="blog-post-title">{title}</div>
          </Link>

        <div className="blog-likes">
        <Favorite disabled={!user} onClick={likeArticle} isFavorited={isFavorited} />
          <span className="likes-count">{favorites}</span>
        </div>
        
      </div>



      <div className="blog-tags">
      {tagList ? tagList.map((tag, index) => <Tag tag={tag} key={index} />) : null}
      </div>

      <p className="blog-post-content">{description}</p>
    </div>
 
  )
}


export default ArticleHeader;