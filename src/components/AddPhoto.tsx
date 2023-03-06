import React, { useState } from "react";
import styled from "styled-components";
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AddPhotoContainer = styled.div`
  width: 60vw;
  background-color: red;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

const PhotoForm = styled.form`
  display: flex;
  width: 100%;
  align-items: space-around;
  justify-content: space-around;
`;
const Label = styled.label``;
const Input = styled.input``;
const Send = styled.button``;

const AddPhoto = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const imgType = ["image/jpeg", "image/png", "image/jpg"];

  function handleSubmit(e) {
    e.preventDefault();
  }

  function sendData(photo) {
    if (!photo) return;
    const storageRef = ref(storage, `photos/${photo}`);
    const uploadTask = uploadBytesResumable(storageRef, photo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
      }
    );
  }
  return (
    <AddPhotoContainer>
      {error && <p>{error}</p>}
      <PhotoForm onSubmit={handleSubmit}>
        <Label>Title</Label>
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Label>Description</Label>
        <Input
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Label>Add Photo</Label>
        <Input
          type="file"
          onChange={(e) => {
            if (imgType.includes(e.target.files[0].type)) {
              setPhoto(e.target.files[0]);
              setError(null);
            } else {
              setError("Your file is not image");
            }
          }}
        />
        <Send onClick={sendData(photo)}>Send</Send>
      </PhotoForm>
    </AddPhotoContainer>
  );
};

export default AddPhoto;
