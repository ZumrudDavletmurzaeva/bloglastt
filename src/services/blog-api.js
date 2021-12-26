export default class BlogApi {
  constructor() {

    this.apiBase = `https://cirosantilli-realworld-next.herokuapp.com/api/`


    this.getResource = async (url) => {
   
      const res = await fetch(url);
      if (!res.ok) {
        // eslint-disable-next-line no-useless-concat
        throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
      }
      return res.json();
    };

    this.getArticleSlug = async (slug) => {
      const articleUrl = `articles/${slug}`;
      const fullUrl = `${this.apiBase}${articleUrl}`;
      return this.getResource(`${fullUrl}`);
    };

    this.getArticles = async () => {
      const articlesUrl = `articles`;

      const fullUrl = `${this.apiBase}${articlesUrl}`
      return this.getResource(`${fullUrl}`);
    };



    this.signUp = async(user) => {
      const registrationUrl = `users`;
      const fullUrl = `${this.apiBase}${registrationUrl}`;
      const result = await fetch(`${fullUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!result.ok) {
        return result.json();
      }

      return result.json();
    };


    this.signIn = async (user) => {
      const authenticationUrl = `users/login`;
      const fullUrl = `${this.apiBase}${authenticationUrl}`;

      const result = await fetch(`${fullUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!result.ok) {
        return result.json();
      }

      return result.json();
    };



    this.getCurrentUser = async (token) => {
      const authorizationUrl = `user`;
      const fullUrl = `${this.apiBase}${authorizationUrl}`;
      const result = await fetch(`${fullUrl}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return result.json();
    };


    this.updateUser = async (token, user) => {
      const authorizationUrl = `user`;
      const fullUrl = `${this.apiBase}${authorizationUrl}`;
      const result = await fetch(`${fullUrl}`, {

        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

   
      return result.json();
    };







    this.createArticle = async (token, article) => {
      const createArticleUrl = `articles`;
      const fullUrl = `${this.apiBase}${createArticleUrl}`;

      const result = await fetch(`${fullUrl}`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });

      return result.json();
    };



    this.updateArticle = async (token, article, slug) => {
      const updateArticleUrl = `articles/${slug}`;
      const fullUrl = `${this.apiBase}${updateArticleUrl}`;

      const request = {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify(article),
      };

      const result = await fetch(`${fullUrl}`, request);


      return result.json();
    };

    this.deleteArticle = async (token, slug) => {
      const deleteArticleUrl = `articles/${slug}`;
      const fullUrl = `${this.apiBase}${deleteArticleUrl}`;
      const request = {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
   
        },
      };

      const result = await fetch(`${fullUrl}`, request);

      if (result.ok) {
        return true;
      }

      return false;
    };







    this.favoriteArticle = async (token, slug) => {
      const favoriteArticleUrl = `articles/${slug}/favorite`;
      const fullUrl = `${this.apiBase}${favoriteArticleUrl}`;
      const request = {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const result = await fetch(`${fullUrl}`, request);

      if (result.ok) {
        return true;
      }

      return false;
    };

    this.unfavoriteArticle = async (token, slug) => {
      const favoriteArticleUrl = `articles/${slug}/favorite`;
      const fullUrl = `${this.apiBase}${favoriteArticleUrl}`;
      const request = {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const result = await fetch(`${fullUrl}`, request);

      if (result.ok) {
        return true;
      }

      return false;
    };
  }





      

  }

