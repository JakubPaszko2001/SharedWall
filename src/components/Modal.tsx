import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

interface Props {
  closeModal: () => void;
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
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  padding: 0.5em;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 2rem;
`;
const Label = styled.label`
  /* color: white; */
`;
const Input = styled.input`
  border: black solid 2px;
  border-radius: 5px;
  padding: 0.5em;
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  cursor: pointer;
  border-radius: 5px;
  background-color: white;
  border: black solid 2px;
  margin-top: 5px;
  padding: 0.5em;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const Error = styled.p`
  color: red;
`;

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
      setError("Password should be at least 6 characters.");
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Valid email or password.");
    }
  };

  function submitForm(e: any) {
    e.preventDefault();
    setError("");

    if (register && password !== confirmPassword) {
      setError("Passwords do not match.");
    }
  }
  return (
    <Wrapper onClick={closeModal}>
      <Container
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <Form onSubmit={submitForm}>
          {error && <Error>{error}</Error>}
          <Label>Email:</Label>
          <Input
            type="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            required
          />
          <Label>Password:</Label>
          <Input
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            required
          />
          {register ? (
            <>
              <Label>Confirm Password:</Label>
              <Input
                type="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
            </>
          ) : null}
          <Button
            type="submit"
            onClick={() => {
              {
                register ? createUser() : signIn();
              }
            }}
          >
            {register ? "Register" : "Login"}
          </Button>
          <Button onClick={closeModal}>Close</Button>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default Modal;
