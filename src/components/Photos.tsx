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

const PhotoContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Container = styled.section`
  width: 80vw;
  margin: 0 auto;
  display: grid;
  gap: 20px;
  margin-bottom: 20px;
  grid-template-columns: 1fr;
  max-width: 400px;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  word-break: break-word;
  gap: 10px;
`;
const Img = styled.img`
  width: 100%;
`;
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
const PostDiv = styled.div``;

const Title = styled.h2``;
const Description = styled.p``;
const Header = styled.h2`
  margin-bottom: 20px;
`;

interface Post {
  id(id: any): void;
  title: string;
  description: string;
  url: string;
  currentUser: string;
}
[];

interface CurrentUserProps {
  currentUser: { email: string };
}

interface List {
  currentUser: string;
  description: string;
  id: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  title: string;
  url: string;
  userId: string;
}
[];
const Photos = ({ currentUser }: CurrentUserProps) => {
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
    <PhotoContainer>
      <Container>
        {post &&
          post.map((post: Post) => {
            return (
              <Post key={post.title}>
                <Img src={post.url} />
                <PostDiv className="title">
                  <Title>{post.title}</Title>
                </PostDiv>
                <PostDiv className="title">
                  <Description>{post.description}</Description>
                </PostDiv>
                {currentUser && currentUser.email === post.currentUser && (
                  <Button onClick={() => handleDelete(post.id)}>delete</Button>
                )}
              </Post>
            );
          })}
      </Container>
    </PhotoContainer>
  );
};

export default Photos;
