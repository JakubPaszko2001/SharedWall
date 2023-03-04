import React, { useState } from "react";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

interface Props {
  closeModal: void;
  login: boolean;
  register: boolean;
}

const Wrapper = styled.div`
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

const Modal = ({ closeModal, register }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = React.useState("");

  const createUser = async () => {
    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.log(error);
      setError("Password should be at least 6 characters");
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Valid email or password");
    }
  };

  function submitForm(e) {
    e.preventDefault();
    setError("");

    if (register && password !== confirmPassword) {
      setError("Passwords do not match");
    }
  }
  return (
    <Wrapper onClick={closeModal}>
      <Container
        onClick={(e: Event) => {
          e.stopPropagation();
        }}
      >
        <Form onSubmit={submitForm}>
          {error && <p>{error}</p>}
          <Label>Email</Label>
          <Input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <Label>Password</Label>
          <Input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          {register ? (
            <>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
            </>
          ) : null}
          <button
            type="submit"
            onClick={() => {
              {
                register ? createUser() : signIn();
              }
            }}
          >
            {register ? "Register" : "Login"}
          </button>
          <button onClick={closeModal}>Close</button>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default Modal;
