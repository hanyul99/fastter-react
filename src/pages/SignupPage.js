import React, { useState } from 'react';
import { Container, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import fetchUtility from '../utils/Request';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignupPage() {
  // 비밀번호 보이기 상태를 관리하는 상태 변수
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const goToLogin = () => {
    navigate('/login'); // '/signup' 경로로 이동하는 함수
  };

  // 비밀번호 토글 핸들러
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, username, password };
      await fetchUtility.post('/users/register', payload);
      // 성공적으로 가입 후 로그인 페이지로 이동
      navigate('/login');
    } catch (error) {
      console.error('Signup Error:', error);
      // 여기에 에러 처리 로직을 추가할 수 있습니다.
    }
  };


  return (
    <Container style={{ width: '600px', marginTop: '50px' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>유저명</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="유저명을 입력하세요" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>패스워드</Form.Label>
          <InputGroup>
            <FormControl
              type={passwordShown ? 'text' : 'password'}
              placeholder="패스워드"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
              {passwordShown ? 'Hide' : 'Show'}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button variant="ghost m-3" onClick={goToLogin}>
          로그인
        </Button>

        <Button variant="primary" type="submit">
          가입하기
        </Button>
      </Form>
    </Container>
  );
}

export default SignupPage;
