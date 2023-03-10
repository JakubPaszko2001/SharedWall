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
  width: 60vw;
  background-color: red;
  margin: 0 auto;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 2rem;
`;

const Post = styled.div``;
const Img = styled.img`
  width: 100px;
  height: 100px;
`;
const Title = styled.h2``;
const Description = styled.p``;
const Button = styled.button``;

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
