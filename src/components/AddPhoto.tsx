import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { storage, db } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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

const AddPhoto = ({ currentUser }: any) => {
  const [data, setData] = useState({});
  const [photo, setPhoto] = useState<any>(null);
  const [error, setError] = useState<string | any>(null);
  const [progress, setProgress] = useState(0);
  const imgType = ["image/jpeg", "image/png", "image/jpg"];

  function handleChange(e: any) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    function sendData() {
      const storageRef = ref(storage, `photos/${crypto.randomUUID()}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setTimeout(() => {
            setProgress(progress);
          }, 1000);
        },
        (err) => {
          setError(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, url: downloadURL }));
          });
        }
      );
    }
    photo && sendData();
  }, [photo]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    await addDoc(collection(db, "photos"), {
      ...data,
      timestamp: serverTimestamp(),
      userId: crypto.randomUUID(),
    });
  };

  return (
    <AddPhotoContainer>
      {error && <p>{error}</p>}
      <PhotoForm onSubmit={handleSubmit}>
        <Label htmlFor="title">Title:</Label>
        <Input id="title" name="title" onChange={handleChange} />
        <Label htmlFor="description">Description:</Label>
        <Input id="description" name="description" onChange={handleChange} />
        <Label htmlFor="addPhoto">Choose Photo:</Label>
        <Input
          id="addPhoto"
          type="file"
          onChange={(e: any) => {
            if (imgType.includes(e.target.files[0].type)) {
              setPhoto(e.target.files[0]);
              setData((prev) => ({ ...prev, currentUser: currentUser.email }));
              setError(null);
            } else {
              setError("Your file is not image");
            }
          }}
        />
        <Send type="submit" disabled={progress !== null && progress < 100}>
          Send
        </Send>
      </PhotoForm>
    </AddPhotoContainer>
  );
};

export default AddPhoto;
