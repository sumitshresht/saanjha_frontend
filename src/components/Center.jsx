
import {Container, Box, Heading} from '@chakra-ui/react'
import PostCard from './PostCard';
 
const Center = () => {
    
    return (
        <Container 
                display={'flex'} 
                flexDirection={'column'}
                >
                <Container>
                    <PostCard/>
                </Container>
                <Container>hwlol moshimosh</Container>
            
        </Container >
    );
}

export default Center;