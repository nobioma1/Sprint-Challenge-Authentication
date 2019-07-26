import React from 'react';
import { Navbar, NavbarBrand, Nav, Button } from 'reactstrap';

const Header = ({ isLogin, setLogin, isLoggedIn, setLoggedIn }) => {
  const onClickHandler = () => {
    setLogin(!isLogin);
  };

  const logout = () => {
    localStorage.removeItem('djtoken');
    setLoggedIn(false);
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Dad Jokes</NavbarBrand>
        <Nav className="ml-auto" navbar>
          {isLoggedIn ? (
            <Button onClick={logout}>Log out</Button>
          ) : !isLogin ? (
            <Button onClick={onClickHandler}>Login</Button>
          ) : (
            <Button onClick={onClickHandler}>Register</Button>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
