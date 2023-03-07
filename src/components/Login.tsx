import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const LoginBtn = styled.button`
  color: green;
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
