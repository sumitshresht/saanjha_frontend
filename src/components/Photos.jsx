import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  SimpleGrid,
  Text,
  Spinner,
  Heading,
  Center,
} from "@chakra-ui/react";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("https://picsum.photos/v2/list?page=2&limit=20");
        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        console.error("Failed to fetch photos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <Center mt="20">
        <Spinner size="xl" color="teal.400" />
      </Center>
    );
  }

  return (
    <Box p={5}>
      <Heading size="lg" mb={6} textAlign="center" color="teal.400">
        Random Photo Gallery
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {photos.map((photo) => (
  <Box
    key={photo.id}
    bg="gray.800"
    borderRadius="md"
    boxShadow="md"
    overflow="hidden"
    _hover={{ transform: "scale(1.02)", transition: "0.3s" }}
  >
    <Image
      src={`https://picsum.photos/id/${photo.id}/500/300`}
      alt={`Photo by ${photo.author}`}
      width="100%"
      height="auto"
    />
    <Box p={4}>
      <Text fontWeight="bold" fontSize="md" color="white">
        {photo.author}
      </Text>
    </Box>
  </Box>
))}

      </SimpleGrid>
    </Box>
  );
};

export default Photos;
