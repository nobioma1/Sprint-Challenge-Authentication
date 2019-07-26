import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import UserForm from './UserForm';
import Jokes from './Jokes';
import Header from './Header';

const App = () => {
  const [isLogin, setLogin] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('djtoken');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Container>
      <Header
        isLogin={isLogin}
        setLogin={setLogin}
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
      />
      {isLoggedIn ? (
        <Jokes />
      ) : (
        <UserForm
          isLogin={isLogin}
          setLogin={setLogin}
          setLoggedIn={setLoggedIn}
        />
      )}
    </Container>
  );
};

export default App;
