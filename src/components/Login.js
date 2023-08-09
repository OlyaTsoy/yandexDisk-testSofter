import React from "react";

const Login = () => {
  // Функция получения OAuth-токена
  const handleLogin = () => {
    window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
  };

  return (
    <div className="container">
      <h1 className="title">Войти в Яндекс Диск</h1>
      <button className="btn" onClick={handleLogin}>Войти с помощью Яндекс</button>
    </div>
  );
};

export default Login;