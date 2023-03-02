import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
const Login = () => {
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState(false);
  const LoginBtn = styled.button`
    color: green;
  `;

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
      {modal && <Modal login={login} closeModal={closeModal} />}
    </div>
  );
};

export default Login;
