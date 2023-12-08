import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import fetchUtility from '../utils/Request';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchUtility.get('/feeds?request_user_id=2'); // API 엔드포인트 경로에 맞게 수정하세요
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/feed/${postId}`);
  }
  
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          {posts.map((post, index) => (
            <Card key={index} className="mb-4" style={{textAlign: 'left', cursor: 'pointer'}}  onClick={() => handlePostClick(post.id)}>
              <Card.Img variant="top" src={`data:image/webp;base64,${post.image}`} alt="Post Image" />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Feed;
