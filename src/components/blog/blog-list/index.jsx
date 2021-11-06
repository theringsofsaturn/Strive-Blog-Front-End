import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import posts from "../../../data/posts.json";
import Loading from "../../../components/loader/index";

export default class BlogList extends Component {
  state = {
    loading: true,
    error: false,
    blogPosts: [],
  };

  componentDidMount() {
    this.handleFetch()
  }

  handleFetch = async () => {
    try {
      const response = await fetch("http://localhost:3001/blogPosts/");

      if (response.ok) {
        const data = await response.json();
        this.setState({
          blogPosts: data,
          loading: false,
        });
      }
    } catch (error) {
      this.setState({ loading: false, error: message });
    }
  };

  render() {
    const { loading, error, blogPosts } = this.state;
    if (loading) {
      return <Loading />;
    } else {
      if (error) {
        return <div>{error}</div>;
      }else{
        return (
          <Row>
            {blogPosts.map((blogPost) => (
              <Col xs={12} sm={6} md={4} lg={3} key={blogPost.id}>
                <BlogItem listing={blogPost} />
              </Col>
            ))}
          </Row>
        );
      }
    }
  }
}
