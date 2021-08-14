import {
  GET_ARTICLES,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATION,
  AUTH_USER,
  SIGN_OUT,
  SITE_LAYOUT,
  GET_ARTICLE,
  ADD_ARTICLE,
  CLEAR_CURRENT_ARTICLE,
} from "../types";

///////////////////// Articles /////////////////////

export const addArticle = (article) => ({
  type: ADD_ARTICLE,
  payload: article,
});

export const getArticles = (articles) => ({
  type: GET_ARTICLES,
  payload: articles,
});

export const getArticle = (article) => ({
  type: GET_ARTICLE,
  payload: article,
});

export const clearCurrentArticle = () => ({
  type: CLEAR_CURRENT_ARTICLE,
});

///////////////////// Notifications /////////////////////

export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload: msg,
});

export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg,
});

export const clearNotification = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_NOTIFICATION,
    });
  };
};

export const authUser = (user) => ({
  type: AUTH_USER,
  payload: user,
});

export const signOut = () => ({ type: SIGN_OUT });

////////////////// Site //////////////////

export const appLayout = (layout) => ({
  type: SITE_LAYOUT,
  payload: layout,
});
