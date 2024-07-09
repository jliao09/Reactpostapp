import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, Loader, Center } from "@mantine/core";
import { useLoaderData, Await, defer } from "react-router-dom";
import { Suspense } from "react";

export const PostPage = () => {
  const { posts } = useLoaderData();

  return (
    <Container>
      <Suspense fallback={
        <Center style={{ height: "100vh" }}>
          <Loader size="xl" />
        </Center>
      }>
        <Await resolve={posts}>
          {(loadedPosts) => (
            <SimpleGrid cols={3}>
              {loadedPosts?.map((post) => (
                <ArticleCardImage key={post.id} {...post} />
              ))}
            </SimpleGrid>
          )}
        </Await>
      </Suspense>
    </Container>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  return defer({ posts: res.data });
};
