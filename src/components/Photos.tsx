import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import styled from "styled-components";

const Container = styled.div`
  width: 80vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* align-items: center; */
  /* justify-content: center; */
  padding: 2rem;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  word-break: break-word;
  max-width: 500px;
  gap: 10px;
`;
const Img = styled.img`
  width: 100%;
  max-width: 300px;
`;
const Title = styled.h2``;
const Description = styled.p``;
const Button = styled.button`
  cursor: pointer;
  background-color: white;
  color: black;
  border: black solid 2px;
  border-radius: 20px;
  padding: 4px 8px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: black;
    color: white;
  }
`;

interface Post {
  id(id: any): void;
  title: string;
  description: string;
  url: string;
  currentUser: string;
}
[];

const Photos = ({ currentUser }: any) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "photos");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const postsRef = onSnapshot(
      q,
      (snapshot) => {
        let list: any = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPost(list);
        // console.log(list);
      },
      (err) => {
        // console.log(err);
      }
    );
    return () => {
      postsRef();
    };
  }, []);
  const handleDelete = async (id: any) => {
    await deleteDoc(doc(db, "photos", id));
  };
  return (
    <Container>
      {post &&
        post.map((post: Post) => {
          return (
            <Post key={post.title}>
              <Img src={post.url} />
              <Title>{post.title}</Title>
              <Description>{post.description}</Description>
              {currentUser && currentUser.email === post.currentUser && (
                <Button onClick={() => handleDelete(post.id)}>delete</Button>
              )}
            </Post>
          );
        })}
    </Container>
  );
};

export default Photos;
