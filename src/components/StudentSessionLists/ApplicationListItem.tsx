import { Box, Button, Colors, Flex, Text } from "@chakra-ui/react";
import { SSApplicationDto } from "../../api/sSApplications";
import { Programme } from "../../api/students";

export type ApplicationListItemProps = {
  application: SSApplicationDto;
  onApplicationClick: () => void;
}

export default function ApplicationListItem({application, onApplicationClick}: ApplicationListItemProps) {
  return (
    <Button w="30vw" variant="card" onClick={onApplicationClick} flexDir="row" flex="1" justifyContent="space-between" m="0.5rem">
      <Flex p="1rem" flexDir="column" flex="1" flexGrow="1">
        <Text textAlign="left" color="ArkadWhite">{`${application.studentFirstName} ${application.studentLastName}`}</Text>
        {application.studentProgramme && 
        <Text textAlign="left" color="ArkadWhite">{Programme[application.studentProgramme].replaceAll("_" , " ")}</Text>}
        {application.studentYear && 
        <Text textAlign="left" color="ArkadWhite">{`Year ${application.studentYear}`}</Text>}
      </Flex>
      {/* Color of box changes depending on status */}
      <Flex 
        bg={(application.status === 2) ? "darkRed" : (application.status === 0) ? "ArkadLightBlue" : "lightGreen"}
        pr="1rem" pl="1rem" pt="0.5rem" pb="0.5rem"
        alignSelf="flex-end"
        rounded="md"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="ArkadWhite">
          {application.status === 2 ? "Rejected" : application.status === 0 ? "Pending" : "Accepted"}
        </Text>
      </Flex>
  </Button>
  )
}
