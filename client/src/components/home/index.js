import React, { useState, useReducer, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import ArticleCard from "../../utils/articleCard";

import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../../store/actions/article_actions";

const initialSort = { sortBy: "_id", order: "desc", limit: 8, skip: 0 };

const Home = () => {
  const [sort, setSort] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialSort
  );
  const articles = useSelector((state) => state.articles);
  const notification = useSelector((state) => state.notification);
  const [loadMore, setLoadMore] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (articles && !articles.articles) {
      dispatch(getArticles(initialSort));
    }
  }, [dispatch, articles]);

  useEffect(() => {
    if (notification && notification.error) {
      setLoadMore(false);
    }
  }, [notification]);

  return (
    <>
      <div>CRROUSEL</div>
      <Grid container spacing={2} className="article_card">
        {articles && articles.articles
          ? articles.articles.map((item, index) => {
              return (
                <Grid key={item._id} item xs={12} sm={6} lg={3}>
                  <ArticleCard key={item._id + index} article={item} />
                </Grid>
              );
            })
          : null}
      </Grid>
      {loadMore ? (
        <Button
          className="mt-2"
          variant="outlined"
          color="secondary"
          onClick={() => {
            let skip = sort.skip + sort.limit;
            dispatch(getArticles({ ...sort, skip: skip }));
            setSort({ skip: skip });
          }}
        >
          Load More
        </Button>
      ) : null}
    </>
  );
};

export default Home;
