import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Center from "./components/Center"
import {Container} from "@chakra-ui/react"
function App() {
  return (
    <>
      <Navbar/>
      <Container display={'flex'} padding={0} margin={0}>
          <Sidebar/>
          <Center/>

      </Container>
    </>
  )
}

export default App
