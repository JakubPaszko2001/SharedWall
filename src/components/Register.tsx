import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const Register = () => {
  const [modal, setModal] = useState(false);
  const [register, setRegister] = useState(false);

  const RegisterBtn = styled.button`
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
      <RegisterBtn
        onClick={() => {
          setRegister(true);
          openModal();
        }}
      >
        Register
      </RegisterBtn>
      {modal && <Modal register={register} closeModal={closeModal} />}
    </div>
  );
};

export default Register;
