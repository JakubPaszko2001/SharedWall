import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const RegisterBtn = styled.button`
  color: green;
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
