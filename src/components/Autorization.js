import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Autorization = () => {
  const navigate = useNavigate();

  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    axios({
      method: 'POST',
      url: process.env.REACT_APP_TOKEN_URL,
      headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
      data: {
        grant_type: 'authorization_code',
        code,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      }
    }).then((res) => {
        const accessToken = res.data.access_token;
        localStorage.setItem('accessToken', accessToken);

        navigate('/disk');
      })
        .catch((error) => {
          console.error('Ошибка авторизации:', error);
        });
  }, []);

  return (
    <div className="container">
      <h1 className="title">Авторизация...</h1>
    </div>
  );
};

export default Autorization;