import {
  Avatar,
  Button,
  Card,
  HStack,
  Stack,
  Strong,
  Text,
  Heading,
  Container, InputGroup, Input, Span
} from "@chakra-ui/react"
import {useState} from 'react'
import { LuCheck, LuX } from "react-icons/lu"

const MAX_CHARACTERS = 100

const PostCard = () => {
    const [value, setValue] = useState("");
  return (
    <Card.Root width="">
      <Card.Body>
        <Stack mb="6" gap="3">
            <Heading>Post Something </Heading>
          <HStack gap="0">
          <Avatar.Root>
            <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
            <Avatar.Fallback name="Nate Foss" />
          </Avatar.Root>
           <Container>
            <InputGroup
      endElement={
        <Span color="fg.muted" textStyle="xs">
          {value.length} / {MAX_CHARACTERS}
        </Span>
      }
    >
      <Input
        placeholder="Enter your message"
        value={value}
        maxLength={MAX_CHARACTERS}
        onChange={(e) => {
          setValue(e.currentTarget.value.slice(0, MAX_CHARACTERS))
        }}
      />
    </InputGroup>
           </Container>
          </HStack>
        </Stack>
        {/* <Card.Description>
          <Strong color="fg">Nate Foss </Strong>
          has requested to join your team. You can approve or decline their
          request.
        </Card.Description> */}
      </Card.Body>
      <Card.Footer>

      </Card.Footer>
      
    </Card.Root>
  )
}

export default PostCard;