import * as articles from "./index";
import axios from "axios";
import { getAuthHeader } from "../../utils/tools";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getArticles = (sort) => {
  return async (dispatch, getState) => {
    try {
      const arts = await axios.post(`/api/articles/loadmore`, sort);
      const prevArts = getState().articles.articles;

      let newArts = [...arts.data];

      if (prevArts) {
        newArts = [...prevArts, ...arts.data];
      }

      dispatch(articles.getArticles(newArts));
    } catch (error) {
      dispatch(articles.errorGlobal("Oops error loading articles"));
    }
  };
};

export const getArticle = (id) => {
  return async (dispatch) => {
    try {
      const request = await axios.get(`/api/articles/get_byid/${id}`);
      dispatch(articles.getArticle(request.data[0]));
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message));
    }
  };
};

export const addArticle = (article) => {
  return async (dispatch) => {
    try {
      const request = await axios.post(
        `/api/articles/admin/add_articles`,
        article,
        getAuthHeader()
      );

      dispatch(articles.addArticle(request.data));
      dispatch(articles.successGlobal("Article added!"));
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message));
    }
  };
};

export const getPaginateArticles = (page = 1, limit = 10) => {
  return async (dispatch) => {
    try {
      const request = await axios.post(
        `/api/articles/admin/paginate`,
        {
          page,
          limit,
        },
        getAuthHeader()
      );

      dispatch(articles.getPaginateArticles(request.data));
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message));
    }
  };
};

export const changeStatusArticle = (status, _id) => {
  return async (dispatch, getState) => {
    try {
      const article = await axios.patch(
        `/api/articles/admin/${_id}`,
        {
          status,
        },
        getAuthHeader()
      );

      let art = article.data;
      let state = getState().articles.adminArticles.docs; ///Previous State
      let position = state.findIndex((art) => art._id === _id);
      state[position] = art;

      dispatch(articles.updateArticleStatus(state));
      dispatch(articles.successGlobal("Successfully updated status"));
    } catch (error) {
      dispatch(articles.errorGlobal("Error updating status"));
    }
  };
};

export const removeArticle = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/articles/admin/${id}`, getAuthHeader());

      dispatch(articles.removeArticle());
      dispatch(articles.successGlobal("Article deleted successfully"));
    } catch (error) {
      dispatch(articles.successGlobal(error.response.data.message));
    }
  };
};

export const getAdminArticle = (id) => {
  return async (dispatch) => {
    try {
      const request = await axios.get(
        `/api/articles/admin/${id}`,
        getAuthHeader()
      );

      dispatch(articles.getArticle(request.data));
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message));
    }
  };
};

export const updateArticle = (article, id) => {
  return async (dispatch) => {
    try {
      const newArticle = await axios.patch(
        `/api/articles/admin/${id}`,
        article,
        getAuthHeader()
      );

      dispatch(articles.getArticle(newArticle.data));
      dispatch(articles.successGlobal("Article successfully updated!"));
    } catch (error) {
      dispatch(articles.errorGlobal("Error updating article. Try again!"));
    }
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const categories = await axios.get(`/api/articles/categories`);

      dispatch(articles.getCategories(categories.data));
    } catch (error) {
      dispatch(articles.errorGlobal("Error fetching categories!"));
    }
  };
};

export const addCategory = (values) => {
  return async (dispatch, getState) => {
    try {
      const category = await axios.post(
        `/api/articles/categories`,
        values,
        getAuthHeader()
      );

      let newState = [...getState().articles.categories, category.data];

      dispatch(articles.addCategory(newState));
      dispatch(articles.successGlobal("Category added successfully!"));
    } catch (error) {
      dispatch(articles.errorGlobal("Error adding categories. Try again!"));
    }
  };
};

export const getNavSearchResults = (page = 1, limit = 5, keywords = "") => {
  return async (dispatch) => {
    try {
      const request = await axios.post(`/api/articles/user/search`, {
        keywords,
        page,
        limit,
      });

      dispatch(articles.navSearch(request.data));
      if (request.data.totalDocs === 0) {
        dispatch(articles.errorGlobal("Not found!"));
      } else {
        dispatch(articles.successGlobal("Search results found!"));
      }
    } catch (error) {
      dispatch(articles.errorGlobal(error.response.data.message));
    }
  };
};
