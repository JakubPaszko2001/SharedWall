import React from "react";
import styled from "styled-components";

interface Props {
  closeModal: void;
  login: boolean;
  register: boolean;
}

const Modal = ({ closeModal, login, register }: Props) => {
  const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
  `;
  const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: green;
  `;
  const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 2rem;
  `;
  const Label = styled.label``;
  const Input = styled.input``;

  return (
    <Modal onClick={closeModal}>
      <Container
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Label>Email</Label>
          <Input type="text" required />
          <Label>Password</Label>
          <Input type="text" required />
          <Label>Confirm Password</Label>
          <Input type="text" required />
          <button onClick={closeModal}>Close</button>
          <button type="submit">Register</button>
        </Form>
      </Container>
    </Modal>
  );
};

export default Modal;
