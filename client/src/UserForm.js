import React, { useState } from 'react';
import axios from 'axios';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
} from 'reactstrap';

const UserForm = ({ isLogin, setLogin, setLoggedIn }) => {
  const text = !isLogin ? 'Register' : 'Login';
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const onChangeHandler = ({ target }) => {
    const name = target.name;
    const value = target.value;
    return setUser(prev => ({ ...prev, [name]: value }));
  };

  const register = async () => {
    const res = await axios.post(`http://localhost:3300/api/register`, user);
    if (res) {
      setUser(prev => ({ ...prev, password: '' }));
      return setLogin(true);
    }
  };

  const login = async () => {
    const res = await axios.post(`http://localhost:3300/api/login`, user);
    if (res) {
      localStorage.setItem('djtoken', res.data.token);
      setLoggedIn(true);
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (user.username && user.password) {
      if (isLogin) return login();
      return register();
    }
  };

  return (
    <div>
      <h1>{text}</h1>
      <form onSubmit={onSubmitHandler}>
        <InputGroup>
          <Input
            placeholder="username"
            onChange={onChangeHandler}
            value={user.username}
            name="username"
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>@username</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br />
        <InputGroup>
          <Input
            placeholder="password"
            onChange={onChangeHandler}
            value={user.password}
            name="password"
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <span role="img" aria-label="key">
                🔑
              </span>
              password
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <br />
        <Button type="submit" color="primary">
          {text}
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
