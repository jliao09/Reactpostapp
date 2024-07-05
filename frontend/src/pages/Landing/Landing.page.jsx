import { Container, Text, Image, Grid } from "@mantine/core";

const Landing = () => {
  return (
    <Container>
      <Text align="center" size="xl" weight={700} style={{ margin: '2rem 0' }}>
        Welcome to PhotoShare
      </Text>
      <Text align="center" size="md" style={{ marginBottom: '2rem' }}>
        PhotoShare is an application for photographers to upload and share posts about photos they’ve taken. 
        Explore amazing photos, share your own, and connect with other photographers.
      </Text>
      <Grid>
        <Grid.Col span={4}>
          <Image src="https://images.unsplash.com/photo-1719150006655-62fdcadf01a7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image 1" />
        </Grid.Col>
        <Grid.Col span={4}>
          <Image src="https://images.unsplash.com/photo-1719216324463-92a973ebf910?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image 2" />
        </Grid.Col>
        <Grid.Col span={4}>
          <Image src="https://images.unsplash.com/photo-1718963892270-04300c864522?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image 3" />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Landing;
