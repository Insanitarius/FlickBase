import {
  GET_ARTICLES,
  GET_ARTICLE,
  ADD_ARTICLE,
  REMOVE_ARTICLE,
  GET_ADMIN_ARTICLES,
  UPDATE_ARTICLE_STATUS,
  CLEAR_CURRENT_ARTICLE,
  CLEAR_DELETED_ARTICLE,
} from "../types";

export default function articleReducer(state = {}, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload };
    case GET_ARTICLE:
      return { ...state, current: action.payload };
    case ADD_ARTICLE:
      return { ...state, lastAdded: action.payload, success: true };
    case REMOVE_ARTICLE:
      return { ...state, removeArticle: true };
    case GET_ADMIN_ARTICLES:
      return { ...state, adminArticles: action.payload };
    case UPDATE_ARTICLE_STATUS:
      return {
        ...state,
        adminArticles: { ...state.adminArticles, docs: action.payload },
      };
    case CLEAR_DELETED_ARTICLE:
      return { ...state, removeArticle: false };
    case CLEAR_CURRENT_ARTICLE:
      return { ...state, current: "" };
    default:
      return state;
  }
}
