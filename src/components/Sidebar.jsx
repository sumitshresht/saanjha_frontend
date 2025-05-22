import {Container, VStack, Text} from "@chakra-ui/react";



const Sidebar = () => {

  return (
    <Container display={'flex'}  flexDirection={'column'} h={'full'} bg={'blue'} w={'70%'} padding={0} marginRight={4} >
        <Container  bg={'yellow'}>
            <VStack>
              <Text>Feed</Text>
              <Text>Friends</Text>
              <Text>Message</Text>
              <Text>Photos</Text>
              <Text>Notification</Text>
            
            </VStack>

        </Container >
        <Container bg={'red'}>
            <VStack>
              <Text>Settings</Text>
              <Text>Help Center</Text>       
            </VStack>

        </Container>
    </Container>
  );
}

export default Sidebar;


