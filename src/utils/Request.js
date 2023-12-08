const BASE_URL = 'http://localhost:8000';

const getTokens = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return { accessToken, refreshToken };
}

const handleApiError = async (error, navigate) => {
  const status = error.status;
  const errorResponse = await error.json()

  if (status >= 500)  {
    alert('알 수 없는 오류가 발생했습니다.');
    return
  }

  if (status >= 400) {
    alert(errorResponse.detail);
  }

  if (status === 401) {
    if (navigate) {
        navigate('/login');
    } else {
        alert('로그인이 필요합니다.');
    }
  }
};

const fetchUtility = {
    get: async (url, headers = {}) => {
      try {
        const response = await fetch(BASE_URL + url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokens().accessToken}`,
            ...headers
          },
        });
        if (!response.ok) {
          handleApiError(response)
        }
        return response;
      } catch (error) {
        console.error('Fetch GET Error:', error);
      }
    },
  
    post: async (url, data, headers = {}) => {
      try {
        const response = await fetch(BASE_URL + url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokens().accessToken}`,
            ...headers
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          handleApiError(response)
        }
        return response;
      } catch (error) {
        console.error('Fetch GET Error:', error);
      }
    },
  
    put: async (url, data, headers = {}) => {
      try {
        const response = await fetch(BASE_URL + url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokens().accessToken}`,
            ...headers
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          handleApiError(response)
        }
        return response;
      } catch (error) {
        console.error('Fetch GET Error:', error);
      }
    },
  
    delete: async (url, headers = {}) => {
      try {
        const response = await fetch(BASE_URL + url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokens().accessToken}`,
            ...headers
          },
        });
        console.log(response.status)
        if (!response.ok) {
          handleApiError(response)
        }
        return response;
      } catch (error) {
        console.error('Fetch GET Error:', error);
      }
    },
  
    patch: async (url, data, headers = {}) => {
      try {
        const response = await fetch(BASE_URL + url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokens().accessToken}`,
            ...headers
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
            handleApiError(response)
        }
        return response;
      } catch (error) {
        console.error('Fetch GET Error:', error);
      }
    },
  };
  
  export default fetchUtility;

  