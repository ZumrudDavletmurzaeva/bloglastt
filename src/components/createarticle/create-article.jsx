/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useContext, useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormText from '../form-text';
import FormTextarea from '../form-textarea';
import BlogApi from '../../services/blog-api';
import TagForm from '../tag-form';
import { SignContext } from '../signContext';


import './create-article.css';


const api = new BlogApi();

const CreateArticle = function({match}) {

  const signContext = useContext(SignContext);
  const { user, setUser } = signContext;

  const slug = match ? match.params.slug : null;
  

  const { register, handleSubmit, formState:{errors}} = useForm();
  
  const [tags, setTags] = useState([]);
  const [tagIds, setTagIds] = useState([1]);
  const [error, setError] = useState(null);
  const [isSubmitted, setSubmitted] = useState(false);
  const [post, setPost] = useState({});


  const addForm = () => {
    window.id += 1;
    setTagIds([...tagIds, window.id + 1]);
  };

  const findIndexId = (id) => tagIds.findIndex((tagId) => tagId === id);

  const onDelete = (id) => {
    const index = findIndexId(id);
    if (index === -1) return;
    setTagIds([...tagIds.slice(0, index), ...tagIds.slice(index + 1)]);
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
  };

  const getTag = (id) => {
    const index = findIndexId(id);
    return tags[index];
  };

  const setTag = (id, tag) => {
    const index = findIndexId(id);
    setTags([...tags.slice(0, index), tag, ...tags.slice(index + 1)]);
  };

  const newTagForm = (id, needAddTag) => (
      <TagForm
        onAdd={addForm}
        onDelete={onDelete}
        register={register}
        tagId={id}
        tag={getTag(id)}
        setTag={setTag}
        key={id}
        needAddTag={needAddTag}
      />
    );

  useEffect(() => {
    window.id = 0;
    if (slug) {
      api.getArticleSlug(slug)
        .then((result) => {
          setPost(result.article);
          const { tagList } = result.article;
          if (tagList) {
            setTags(tagList);
            setTagIds(tagList.map((tag, index) => index));
          }
          return result;
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [slug]);

 

  if (isSubmitted) {
    return <Redirect to="/" />
  } 

  const create = async (articleData) => {
    const { token } = user;
    try {
      const result = await api.createArticle(token, {
        article: { ...articleData, tagList: tags },
      })
    } catch (err) {
      setError(err);
      return false;
    }
    return true;
  };


  const update = async (articleData) => {
    const { token } = user;
    try {
      const result = await api.updateArticle(token, { article: { ...articleData, tagList: tags }}, slug);
    } catch (err) {
      setError(err);
      return false;
    }
    return true;
  }


  const onSubmit = async (articleData) => {
    let result;
    if (slug) {
      result = await update(articleData);
    } else {
      result = await create(articleData);
    }
    setSubmitted(result);
  };
  


  const { title, description, body} = post;

return(
  <form  className="article-create" onSubmit={handleSubmit(onSubmit)}>
<h5>{match.params.slug ? "Edit article" : "Create new article"}</h5>

<FormText
  label="Title"
  placeholder="Title"
  register={register}
  validation = {{required: true }}
  name="title"
  error={errors.title}
defaultValue={title}/>


<FormText
label="Short description"
placeholder="Short description"
register={register}
validation = {{required: true }}
name="description"
error={errors.description}
defaultValue={description}/>


<FormTextarea
 label="Text"
placeholder="Text"
register={register}
validation = {{required: true }}
name="body"
error={errors.body}
defaultValue={body}
/>

<ul>
  {tagIds.map((id, index, tags) =>
  newTagForm(id, index === 0, index === tags.length + 1),
  )}
</ul>

<input className="btn-submit"  type="submit" value="Send" />

</form>
);


    
}

export default CreateArticle;
