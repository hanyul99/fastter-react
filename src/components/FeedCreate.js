import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import fetchUtility from '../utils/Request';

const CreateFeed = () => {
  const navigate = useNavigate(); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value.slice(0, 100)); // 타이틀 100자 제한
  };

  const handleContentChange = (e) => {
    setContent(e.target.value.slice(0, 500)); // 컨텐츠 500자 제한
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageBase64(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, content, image: imageBase64 };
    const response = await fetchUtility.post('/feeds?request_user_id=2', payload);
  
    if (response.ok) {
      const feedData = await response.json();
      navigate(`/feed/${feedData.id}`);
    } else {
      console.log("Error in feed creation");
      // 에러 처리 로직
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="feedTitle">
          <Form.Label>타이틀</Form.Label>
          <Form.Control
            type="text"
            placeholder="타이틀을 입력하세요"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>

        <Form.Group controlId="feedImage">
          <Form.Label>이미지</Form.Label>
          <div onClick={() => document.getElementById('imageUpload').click()}>
            {imageBase64 ? (
              <img src={imageBase64} alt="Upload" style={{ maxWidth: '100%', height: 'auto' }} />
            ) : (
              <Button>이미지 업로드</Button>
            )}
            <Form.Control
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
        </Form.Group>

        <Form.Group controlId="feedContent">
          <Form.Label>컨텐츠</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="내용을 입력하세요"
            value={content}
            onChange={handleContentChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          피드 생성
        </Button>
      </Form>
    </Container>
  );
};

export default CreateFeed;
