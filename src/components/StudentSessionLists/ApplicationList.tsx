import { OrderedList, ListItem, VStack, Heading, Box, SimpleGrid, UnorderedList } from "@chakra-ui/react";
import { SSApplicationDto } from "../../api/sSApplications";
import ApplicationListItem from "./ApplicationListItem";

export type ApplicationListProps = {
  applications: SSApplicationDto[] | null;
  onApplicationClick: (studentId: number) => void;
}

export default function ApplicationList({applications, onApplicationClick}: ApplicationListProps) {
  applications?.sort((a, b) => a.studentFirstName.localeCompare(b.studentFirstName))
  return (
    <SimpleGrid columns={{base: 1, lg: 3}} spacing="1rem" mx="1rem">
      <VStack justifyContent="center">
        <Heading color="arkadDarkBlue" m="2rem">Pending</Heading>
        {applications?.filter((appli) => appli.status === 0).map((application) => (
          <ApplicationListItem 
            key={application.id} 
            application={application}
            onApplicationClick={() => onApplicationClick(application.studentId)}/>
        ))}
      </VStack>
      <VStack>
        <Heading color="arkadDarkBlue" m="2rem">Accepted</Heading>
        {applications?.filter((appli) => appli.status === 1).map((application) => (
          <ApplicationListItem 
          key={application.id} 
          application={application}
          onApplicationClick={() => onApplicationClick(application.studentId)}/>
        ))}
      </VStack>
      <VStack>
        <Heading color="arkadDarkBlue" m="2rem">Rejected</Heading>
        {applications?.filter((appli) => appli.status === 2).map((application) => (
          <ApplicationListItem 
          key={application.id} 
          application={application}
          onApplicationClick={() => onApplicationClick(application.studentId)}/>
        ))}
      </VStack>
    </SimpleGrid>
  )
}
