import React, { useEffect, useState, useReducer } from "react";
import AdminLayout from "../../../hoc/adminLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  changeStatusArticle,
  getPaginateArticles,
  removeArticle,
} from "../../../store/actions/article_actions";
import PaginationComponent from "./paginate";

import CachedIcon from "@material-ui/icons/Cached";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  Modal,
  Button,
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../../utils/loader";

const Articles = (props) => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);
  const notification = useSelector((state) => state.notification);
  const [removeAlert, setRemoveAlert] = useState(false);
  const [resetIcon, setResetIcon] = useState(false);
  const [loadIcon, setloadIcon] = useState("none");
  const [toRemove, setToRemove] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchValues, setSearchValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { value: "", memory: "" }
  );

  let limit = 5;
  let arts = articles.adminArticles;

  const editArtsAction = (id) => {
    props.history.push(`/dashboard/articles/edit/${id}`);
  };

  const handleClose = () => setRemoveAlert(false);

  const handleShow = (id = null) => {
    setToRemove(id);
    setRemoveAlert(true);
  };

  const handleDelete = () => {
    dispatch(removeArticle(toRemove));
  };

  const goToPrevPage = (page) => {
    dispatch(getPaginateArticles(page, limit, searchValues.memory.trim()));
  };

  const goToNextPage = (page) => {
    dispatch(getPaginateArticles(page, limit, searchValues.memory.trim()));
  };

  const handleStatusChange = (status, _id) => {
    let newStatus = status === "draft" ? "public" : "draft";
    dispatch(changeStatusArticle(newStatus, _id));
  };

  const triggerSearch = (e) => {
    e.preventDefault();
    if (searchValues.value !== "") {
      setloadIcon("block");
      setSearchValues({ memory: searchValues.value });
    }
  };

  const resetSearch = () => {
    setSearchValues({ value: "", memory: "" });
    dispatch(getPaginateArticles());
  };

  useEffect(() => {
    setLoading(false);
  }, [articles]);

  ///////New Search///////

  useEffect(() => {
    setLoading(true);
    dispatch(getPaginateArticles(1, limit, searchValues.memory.trim()));
  }, [dispatch, searchValues.memory, limit]);

  useEffect(() => {
    handleClose();
    if (notification && notification.removeArticle) {
      dispatch(
        getPaginateArticles(arts.page, limit, searchValues.memory.trim())
      );
    }
  }, [dispatch, notification, arts, limit, searchValues.memory]);

  useEffect(() => {
    dispatch(getPaginateArticles());
  }, [dispatch]);

  return (
    <>
      <AdminLayout section="Articles">
        <div className="articles_table">
          <ButtonToolbar className="mb-3">
            <ButtonGroup className="mr-2">
              <LinkContainer to="/dashboard/articles/add">
                <Button variant="info">Add Article</Button>
              </LinkContainer>
            </ButtonGroup>

            <form onSubmit={triggerSearch}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="btnGroupAddon2">Search</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="text"
                  placeholder="Example"
                  value={searchValues.value}
                  onChange={(e) => setSearchValues({ value: e.target.value })}
                />
              </InputGroup>
            </form>
            {resetIcon ? (
              <CircularProgress
                className="ml-2 mt-1"
                size="30px"
                color="secondary"
              />
            ) : (
              <Box display={loadIcon}>
                <CachedIcon
                  className="ml-2 mt-1"
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                  color="secondary"
                  onClick={() => {
                    setResetIcon(true);
                    resetSearch();
                    setTimeout(() => {
                      setloadIcon("none");
                      setResetIcon(false);
                    }, 500);
                  }}
                />
              </Box>
            )}
          </ButtonToolbar>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div>
                {searchValues.memory !== "" ? (
                  <p>
                    Your search for <b>"{searchValues.memory.trim()}"</b> had{" "}
                    <b>{articles.adminArticles.totalDocs}</b>{" "}
                    {articles.adminArticles.totalDocs > 1
                      ? "results."
                      : "result."}
                  </p>
                ) : null}
              </div>
              <PaginationComponent
                arts={arts}
                prev={(page) => goToPrevPage(page)}
                next={(page) => goToNextPage(page)}
                handleShow={(id) => handleShow(id)}
                handleStatusChange={(status, _id) =>
                  handleStatusChange(status, _id)
                }
                editArtsAction={(id) => editArtsAction(id)}
              />
            </>
          )}

          <Modal show={removeAlert} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you really sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>This action cannot be undone</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close this
              </Button>
              <Button variant="danger" onClick={() => handleDelete()}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </AdminLayout>
    </>
  );
};

export default Articles;
