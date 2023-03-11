import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const RegisterBtn = styled.button`
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

const Register = () => {
  const [modal, setModal] = useState(false);
  const [register, setRegister] = useState(false);

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }
  return (
    <div>
      <RegisterBtn
        onClick={() => {
          setRegister(true);
          openModal();
        }}
      >
        Register
      </RegisterBtn>
      {modal && (
        <Modal register={register} closeModal={closeModal} login={false} />
      )}
    </div>
  );
};

export default Register;
