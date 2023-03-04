import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import Register from "./Register";
import { auth } from "../config/firebase";

const Nav = styled.nav`
  width: 60vw;
  background-color: red;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;
const LogoTitle = styled.h1``;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const CurrentUser = styled.div``;
const Logout = styled.button``;

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <Nav>
      <LogoTitle>Auction</LogoTitle>
      <Wrapper>
        {currentUser ? (
          <>
            <CurrentUser>{currentUser.email}</CurrentUser>
            <Logout onClick={logout}>Logout</Logout>
          </>
        ) : (
          <>
            <Login />
            <Register />
          </>
        )}
      </Wrapper>
    </Nav>
  );
};

export default Navbar;
