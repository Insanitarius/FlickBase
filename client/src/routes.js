import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import GoogleFontLoader from "react-google-font-loader";

import { useDispatch, useSelector } from "react-redux";

import Home from "./components/home";
import Header from "./components/navigation/header";
import MainLayout from "./hoc/mainLayout";
import Auth from "./components/auth";
import { isAuthUser } from "./store/actions/users_actions";
import Loader from "./utils/loader";
import Dashboard from "./components/dashboard";
import Profile from "./components/dashboard/profile";
import Articles from "./components/dashboard/articles";
import AuthGuard from "./hoc/authGuard";
import Article from "./components/articles/article";
import AddArticle from "./components/dashboard/articles/addArticle";
import EditArticle from "./components/dashboard/articles/editArticle";
import Contact from "./components/contact";
import AccountVerification from "./components/auth/verification";
import Categories from "./components/dashboard/categories";
import SearchResults from "./components/search";

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(isAuthUser());
  }, [dispatch]);

  useEffect(() => {
    if (users.auth != null) {
      setLoading(false);
    }
  }, [users]);

  return (
    <BrowserRouter>
      <Header />

      {loading ? (
        <Loader />
      ) : (
        <MainLayout>
          <Switch>
            <Route
              path="/dashboard/articles/edit/:id"
              component={AuthGuard(EditArticle, true)}
            />
            <Route
              path="/dashboard/articles/add"
              component={AuthGuard(AddArticle, true)}
            />
            <Route
              path="/dashboard/articles"
              component={AuthGuard(Articles, true)}
            />
            <Route
              path="/dashboard/categories"
              component={AuthGuard(Categories)}
            />
            <Route path="/dashboard/profile" component={AuthGuard(Profile)} />
            <Route path="/dashboard" component={AuthGuard(Dashboard)} />
            <Route path="/contact" component={Contact} />
            <Route path="/verification" component={AccountVerification} />
            <Route path="/searchresults" component={SearchResults} />
            <Route path="/article/:id" component={Article} />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={Home} />
          </Switch>
        </MainLayout>
      )}
      <GoogleFontLoader
        fonts={[
          { font: "Roboto", weights: [300, 400, 900] },
          { font: "Fredoka One" },
        ]}
      />
    </BrowserRouter>
  );
};

export default Routes;
