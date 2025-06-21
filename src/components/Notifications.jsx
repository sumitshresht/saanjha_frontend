import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { BsBellFill } from "react-icons/bs";
import { useNavigate } from "react-router";

function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const userId = JSON.parse(sessionStorage.getItem("user"))?.userId;
      const res = await axios.get("https://saanjhabackend-production.up.railway.app/notifications", {
        params: { userId },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Box
      minH="100vh"
      //bg="gray.900"
      px={4}
      py={10}
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Box
        maxW="700px"
        w="100%"
        bg="rgba(255,255,255,0.05)"
        border="1px solid rgba(255,255,255,0.1)"
        backdropFilter="blur(14px)"
        borderRadius="2xl"
        boxShadow="xl"
        p={6}
      >
        <Heading
          fontSize={{ base: "2xl", md: "3xl" }}
          color="teal.300"
          mb={6}
          textAlign="center"
        >
          Notifications
        </Heading>

        {loading ? (
          <Box display="flex" justifyContent="center" pt={10}>
            <Spinner size="xl" color="teal.300" />
          </Box>
        ) : notifications.length === 0 ? (
          <Text textAlign="center" color="gray.400" fontSize="lg">
            No notifications yet.
          </Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {notifications.map((note) => (
              <Box
                key={note.id}
                bg="rgba(255,255,255,0.04)"
                border="1px solid rgba(255,255,255,0.1)"
                backdropFilter="blur(12px)"
                borderRadius="lg"
                p={4}
                boxShadow="sm"
                _hover={{
                  bg: "rgba(255,255,255,0.07)",
                  transform: "scale(1.01)",
                  transition: "0.2s",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/feed")}
              >
                <HStack spacing={3} align="start">
                  <Box
                    bg="teal.600"
                    p={2}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="md"
                  >
                    <Icon as={BsBellFill} boxSize={4} color="white" />
                  </Box>

                  <Box>
                    <Text fontSize="md" fontWeight="medium" color="white">
                      {note.message}
                    </Text>
                    <Text fontSize="xs" color="gray.400" mt={1}>
                      {new Date(note.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default Notification;
