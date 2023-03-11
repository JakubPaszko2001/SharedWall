import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import Register from "./Register";
import { auth } from "../config/firebase";

const Nav = styled.nav`
  width: 80vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Logout = styled.button`
  cursor: pointer;
  background-color: white;
  color: black;
  border: black solid 2px;
  border-radius: 20px;
  padding: 8px 16px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const LogoTitle = styled.h1``;
const CurrentUser = styled.p`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

const Navbar = ({ currentUser }: any) => {
  const logout = () => {
    return auth.signOut();
  };

  return (
    <Nav>
      <LogoTitle>SharedWall</LogoTitle>
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
