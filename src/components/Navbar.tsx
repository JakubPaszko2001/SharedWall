import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddPhoto from "../components/AddPhoto";
import Login from "./Login";
import Register from "./Register";
import { auth } from "../config/firebase";

const Nav = styled.nav`
  width: 80vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
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
const AddPost = styled.button`
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
const AddPhotoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface CurrentUserProps {
  currentUser: { email: string };
}
const Navbar = ({ currentUser }: CurrentUserProps) => {
  const [modal, setModal] = useState(false);
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
            <AddPost
              onClick={() => {
                setModal(true);
              }}
            >
              Add Post
            </AddPost>
            {modal ? (
              <AddPhotoModal>
                <AddPhoto setModal={setModal} currentUser={currentUser} />
              </AddPhotoModal>
            ) : null}
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
