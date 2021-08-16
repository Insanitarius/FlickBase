import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../../hoc/adminLayout";
import { Table, Row, Col } from "react-bootstrap";
import AddCategory from "./addCategory";
import { getCategories } from "../../../store/actions/article_actions";

const Categories = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <AdminLayout section="Categories">
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {articles.categories
                ? articles.categories.map((item, index) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </Col>
        <Col>
          <AddCategory />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Categories;
