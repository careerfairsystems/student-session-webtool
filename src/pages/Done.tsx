import source from "../assets/images/arkad_logo.png";
import { Flex, Image } from "@chakra-ui/react";

export default function Done() {
  
  return (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">  
      <Image src={source} alt="Logo" boxSize="25rem" />
    </Flex>
  )
}
