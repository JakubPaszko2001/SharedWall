import { collection, onSnapshot } from "firebase/firestore";
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

const Photos = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const postsRef = onSnapshot(
      collection(db, "photos"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPost(list);
      },
      (err) => {
        console.log(err);
      }
    );
    return () => {
      postsRef();
    };
  }, []);
  return (
    <Container>
      {post &&
        post.map((post) => {
          console.log(post);
          return (
            <Post>
              <Img src={post.url} />
              <Title>{post.title}</Title>
              <Description>{post.description}</Description>
            </Post>
          );
        })}
    </Container>
  );
};

export default Photos;
