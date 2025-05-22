
import {Container, Box, Heading} from '@chakra-ui/react'
 
const Center = () => {
    
    return (
        <>
        <Container>
            <Box w={"2/4"} backgroundColor={"red"}>
            <Heading>Post something about you.</Heading>
            </Box>
        </Container>
        <Container></Container>
            
        </>
    );
}

export default Center;