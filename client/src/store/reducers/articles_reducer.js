import {
  GET_ARTICLES,
  GET_ARTICLE,
  ADD_ARTICLE,
  NAV_SEARCH,
  GET_ADMIN_ARTICLES,
  UPDATE_ARTICLE_STATUS,
  CLEAR_CURRENT_ARTICLE,
  GET_CATEGORIES,
  ADD_CATEGORY,
} from "../types";

export default function articleReducer(state = {}, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload };
    case GET_ARTICLE:
      return { ...state, current: action.payload };
    case ADD_ARTICLE:
      return { ...state, lastAdded: action.payload, success: true };
    case GET_ADMIN_ARTICLES:
      return { ...state, adminArticles: action.payload };
    case UPDATE_ARTICLE_STATUS:
      return {
        ...state,
        adminArticles: { ...state.adminArticles, docs: action.payload },
      };
    case CLEAR_CURRENT_ARTICLE:
      return { ...state, current: "" };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ADD_CATEGORY:
      return { ...state, categories: action.payload };
    case NAV_SEARCH:
      return { ...state, navSearch: action.payload };
    default:
      return state;
  }
}
