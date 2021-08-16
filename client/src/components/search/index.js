import React from "react";
import { useSelector } from "react-redux";

import { Grid } from "@material-ui/core";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

import ArticleCard from "../../utils/articleCard";
import Loader from "../../utils/loader";

const SearchResults = (props) => {
  const articles = useSelector((state) => state.articles);
  const query = new URLSearchParams(props.location.search);
  const keywords = query.get("keywords");
  console.log(articles.navSearch);

  return (
    <>
      {articles.navSearch && articles.navSearch.docs ? (
        <>
          <p className="mb-4">
            <u>Search results for</u>: "<b>{keywords}</b>" returned{" "}
            <b>{articles.navSearch.totalDocs}</b> Results
          </p>
          <Grid container spacing={2} className="article_card">
            {articles.navSearch.docs.map((item) => (
              <Grid key={item._id} item xs={12} sm={6} lg={3}>
                <ArticleCard article={item} />
              </Grid>
            ))}
          </Grid>
          <div className="mt-3" style={{ textAlign: "center" }}>
            {articles.navSearch.totalDocs === 0 ? (
              <SentimentDissatisfiedIcon
                style={{
                  fontSize: "200px",
                }}
              />
            ) : null}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SearchResults;
