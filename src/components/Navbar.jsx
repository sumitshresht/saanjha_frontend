import { Container,  Link, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <Container fluid display={'flex'} justifyContent={'space-between'} alignItems={'center'} shadow={'md'} padding={3} style={{
      backgroundColor:'black'
    }}>
      <Text flexGrow={1} fontWeight={'bold'} color={"white"}>Logo</Text>
    
      <Container display={'flex'} gap={4}>
        <NavLink style={{color:'white' , fontSize:12}}>Home</NavLink>
        <NavLink style={{color:'white' , fontSize:12}}>Login</NavLink>
        <NavLink style={{color:'white' , fontSize:12}}>Register</NavLink>

      </Container>
    
    </Container>
  );
};

export default Navbar;