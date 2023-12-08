import { React, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";


function LoginPage() {
  let navigate = useNavigate();
  const [userIdentifier, setUserIdentifier] = useState(''); // 유저명(또는 이메일) 상태 관리
  const [password, setPassword] = useState(''); // 비밀번호 상태 관리
  const clientId = '165132549024-lpfa03dmdevrs21h02usi4eihtjr76ah.apps.googleusercontent.com'

  const goToSignup = () => {
    navigate('/signup'); // '/signup' 경로로 이동하는 함수
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    // 로그인 요청 보내기
    try {
      const response = await fetch('http://localhost:8000/users/login', { // 여기에 실제 API 엔드포인트 주소를 넣어야 합니다.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_identifier": userIdentifier, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        // 로컬 스토리지에 토큰 저장
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        navigate('/');
      } else {
        // 오류 처리 (예: 사용자에게 오류 메시지 표시)
        alert(data.detail);
      }
    } catch (error) {
      console.error('로그인 실패 오류:', error);
    }
  };

  const handleGoogleLogin = async (credentials) => {
    // 로그인 요청 보내기
    try {
      console.log(credentials);
      const response = await fetch('http://localhost:8000/users/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "credentials": credentials.credential }),
      });
      const data = await response.json();
      if (response.status === 200) {
        // 로컬 스토리지에 토큰 저장
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        navigate('/');
      } else {
        // 오류 처리 (예: 사용자에게 오류 메시지 표시)
        alert(data.detail);
      }
    } catch (error) {
      console.error('로그인 실패 오류:', error);
    }
  }
  
  

  return (
    <Container style={{ width: '600px', marginTop: '50px' }}>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>유저명</Form.Label>
          <Form.Control 
            placeholder="유저명 또는 이메일" 
            value={userIdentifier} // value를 상태에 연결
            onChange={(e) => setUserIdentifier(e.target.value)} // 입력 값이 변경될 때마다 상태 업데이트
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control 
            type="password" 
            placeholder="비밀번호" 
            value={password} // value를 상태에 연결
            onChange={(e) => setPassword(e.target.value)} // 입력 값이 변경될 때마다 상태 업데이트
          />
        </Form.Group>

        
        <Button className="m-3" variant="primary" type="submit">
          로그인
        </Button>        

        <Button variant='ghost' onClick={goToSignup}>
          회원가입
        </Button>

        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={(res) => {
                  handleGoogleLogin(res);
                }}
                onFailure={(err) => {
                    alert('구글 로그인 실패');
                }}
            />
        </GoogleOAuthProvider>
      </Form>
    </Container>
  );
}

export default LoginPage;
