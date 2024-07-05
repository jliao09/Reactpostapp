import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Container, Text, Image, Grid, Group } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import useBoundStore from "../../store/Store";

const PostDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { user } = useBoundStore((state) => state);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  const handleEditClick = () => {
    navigate(`/posts/edit/${id}`);
  };

  return (
    <Container>
      <Grid>
        <Grid.Col span={8}>
          <Text>Author: {post.authorName}</Text>
          <Text>Title: {post.title}</Text>
          <Text>Category: {post.category}</Text>
          <Text>Content: {post.content}</Text>
        </Grid.Col>
        <Grid.Col span={4}>
          {post.image && <Image src={post.image} alt="Post image" />}
        </Grid.Col>
      </Grid>
      <Group position="left" mt="md">
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>
        {post.userId === user.id && (
          <Button onClick={handleEditClick} color="gray">
            Edit
          </Button>
        )}
      </Group>
    </Container>
  );
};

export const postDetailsLoader = async ({ params }) => {
  const response = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return response.data;
};

export default PostDetailsPage;
