import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextInput, Button, Group, Box, Textarea } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import { useForm } from "@mantine/form";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      image: "",
      content: "",
    },
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/posts/${id}`);
        form.setValues(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const res = await axios.put(`${DOMAIN}/api/posts/${id}`, values);
      if (res?.data.success) {
        navigate(`/posts/${id}`);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Box style={{ maxWidth: 600 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Category"
          placeholder="Enter a Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image URL"
          {...form.getInputProps("image")}
        />
        <Textarea
          label="Content"
          placeholder="Enter some content"
          autosize
          minRows={4}
          {...form.getInputProps("content")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
};

export default EditPostPage;
