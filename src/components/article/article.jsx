/* eslint-disable react/prop-types */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect,useContext} from 'react';
import { withRouter , Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {  Spin } from 'antd';
import PropTypes from 'prop-types';
import ArticleHeader from '../article-header';
import DeleteConfirm from '../delete-confirm';
import BlogApi from '../../services/blog-api';
import { SignContext } from '../signContext';
import './article.css';

const api = new BlogApi();

const Article = function({match}) {


  const signContext = useContext(SignContext);
  const { user, setUser } = signContext;

  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [slug, setSlug] = useState(match.params.slug);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    api.getArticleSlug(slug).then((response) => {
      setPost(response.article);
      setIsLoading(false);
    })
  }, [slug])

  
  const noDelete = () => {
    setShowConfirm(false);
  };

  const yesDelete = () => {
    setShowConfirm(false);
    const { token } = user;
    const isDelete = api.deleteArticle(token, slug);
    if (isDelete) {
      setSlug('');
    }
  };

  const spin = isLoading ? <Spin /> : null;
  const confirm = showConfirm ? (
    <DeleteConfirm onAccept={yesDelete} onReject={noDelete} />
  ) : null;


  let postData
  let postBody 
  let controlButtons 
  
  if (post && !spin) {
    postData=  <ArticleHeader {...post} /> 
    postBody=<ReactMarkdown className="post-body">{post.body}</ReactMarkdown>
  if (user.username === post.author.username) {
    controlButtons = (
      <div className="control-buttons">
        <input className="delete" 
      onClick={() => setShowConfirm(true)} type='button' value="Delete"
     />
        {confirm}
        <Link className="edit"
          to={`/articles/${slug}/edit`}
      >Edit</Link>
      </div>
    );
  }
  }
  return (
    <div className="post-container">
    <div className="header">
      <div className="article">
      {spin}
     {postData}
</div>
{controlButtons}
</div>
{postBody}
</div>

  )
}








export default withRouter(Article);