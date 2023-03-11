import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const LoginBtn = styled.button`
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

const Login = () => {
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState(false);

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }
  return (
    <div>
      <LoginBtn
        onClick={() => {
          setLogin(true);
          openModal();
        }}
      >
        Login
      </LoginBtn>
      {modal && (
        <Modal login={login} closeModal={closeModal} register={false} />
      )}
    </div>
  );
};

export default Login;
