
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ToggleButton, ButtonGroup, Button, ToggleButtonGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CommentsSection from './CommentSection';
import fetchUtility from '../utils/Request';
import getDecodedPayload from '../utils/TokenDecode';

const leftAlignedText = {
  textAlign: 'left'
};

const VisibilityChoices = {
  EVERYONE: 'everyone',
  ONLY_AUTHOR: 'only_author',
  FOLLOWERS: 'followers'
};


const FeedDetail = () => {
  const navigate = useNavigate();
  const { feedId } = useParams(); // useParams 훅을 이용해 feedId를 얻습니다.
  const [visibility, setVisibility] = useState(VisibilityChoices.EVERYONE);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const currentUser = getDecodedPayload();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetchUtility.get(`/feeds/${feedId}`);
        const post = await response.json();
        setPost(post);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [feedId]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetchUtility.get(`/comments/?feed_id=${feedId}`);
        const comment = await response.json();
        setComments(comment);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchComment();
  }, [feedId]);

  const handleVisibilityChange = (val) => {
    setVisibility(val);
  };

  

  const handleDelete = () => {
    const confirmDelete = window.confirm("이 피드를 삭제하시겠습니까?");
    if (confirmDelete) {
      // 삭제 로직 (API 호출 등)
      navigate("/");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="mb-4 text-left" style={leftAlignedText}>
            <Card.Img variant="top" src={`data:image/webp;base64,${post.image}`} alt="Post Image" />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.content}</Card.Text>
            </Card.Body>
          </Card>
          {currentUser.user_id === post.author.id && (
          <>
          <ButtonGroup className='m-3'>
            <ToggleButtonGroup type="radio" name="visibility" value={visibility} onChange={handleVisibilityChange}>
              <ToggleButton id="tbg-radio-1" value={VisibilityChoices.EVERYONE}>Everyone</ToggleButton>
              <ToggleButton id="tbg-radio-2" value={VisibilityChoices.ONLY_AUTHOR}>Only Author</ToggleButton>
              <ToggleButton id="tbg-radio-3" value={VisibilityChoices.FOLLOWERS}>Followers</ToggleButton>
            </ToggleButtonGroup>
          </ButtonGroup>
          <Button variant="danger" onClick={handleDelete}>삭제</Button>
          </>
          )}
          {/* 댓글 영역을 여기에 구현하기 */}
          <CommentsSection feedId={feedId} comments={comments} setComments={setComments} />
        </Col>
      </Row>
    </Container>
  );
};

export default FeedDetail;
