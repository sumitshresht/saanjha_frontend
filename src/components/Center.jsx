
import {Container, Box, Heading} from '@chakra-ui/react'
//import PostCard from './PostCard';
//import PostList from './PostList'; // Uncomment if you want to use PostList instead of PostCard
//import Feed from './Feed';
 import PostFeed from './PostFeed';
const Center = () => {
    
    return (
        <Container 
                display={'flex'} 
                flexDirection={'column'}
                >
                <Container>
                    <PostFeed/>
                </Container>
                
            
        </Container >
    );
}

export default Center;