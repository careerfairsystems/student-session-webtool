import { OrderedList, ListItem, Flex, Heading, Box } from "@chakra-ui/react";
import { SSApplicationDto } from "../../api/sSApplications";
import ApplicationListItem from "./ApplicationListItem";

export type ApplicationListProps = {
  applications: SSApplicationDto[] | null;
  onApplicationClick: (studentId: number) => void;
}

export default function ApplicationList({applications, onApplicationClick}: ApplicationListProps) {
  return (
    <Flex flexDir="row">
      <Flex flexDir="column" w="30vw">
        <Heading color="arkadDarkBlue" m="2rem">Pending</Heading>
        <OrderedList flexDir="column">
          {applications?.filter((appli) => appli.status === 0).map((application) => (
            <ApplicationListItem 
              key={application.id} 
              application={application}
              onApplicationClick={() => onApplicationClick(application.studentId)}/>
          ))}
        </OrderedList>
      </Flex>
      <Flex flexDir="column" w="30vw">
        <Heading color="arkadDarkBlue" m="2rem" >Accepted</Heading>
        <OrderedList flexDir="column">
          {applications?.filter((appli) => appli.status === 1).map((application) => (
            <ApplicationListItem 
            key={application.id} 
            application={application}
            onApplicationClick={() => onApplicationClick(application.studentId)}/>
          ))}
        </OrderedList>
      </Flex>
      <Flex flexDir="column" w="30vw">
        <Heading color="arkadDarkBlue" m="2rem">Rejected</Heading>
        <OrderedList flexDir="column">
        {applications?.filter((appli) => appli.status === 2).map((application) => (
          <ApplicationListItem 
          key={application.id} 
          application={application}
          onApplicationClick={() => onApplicationClick(application.studentId)}/>
        ))}
        </OrderedList>
      </Flex>
  </Flex>
  )
}
