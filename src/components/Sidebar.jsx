import {Container, VStack, Text, Box, StackSeparator} from "@chakra-ui/react";



const Sidebar = () => {

  return (
    <Box display={'flex'} h={"94vh"} pos={'sticky'} justifyContent={'space-between'} alignItems={'flex-start'} flexDirection={'column'} bg={'blue'} w={'40%'}  padding={0} >
        <Container  bg={'yellow'} h={"3/5"}>
            <VStack h={"1/2"} separator={<StackSeparator />}>
              <Text>Feed</Text>
              <Text>Friends</Text>
              <Text>Message</Text>
              <Text>Photos</Text>
              <Text>Notification</Text>
            
            </VStack>

        </Container >
        <Container bg={'red'} h={"1/6"}>
            <VStack>
              <Text>Settings</Text>
              <Text>Help Center</Text>       
            </VStack>

        </Container>
    </Box>
  );
}

export default Sidebar;


