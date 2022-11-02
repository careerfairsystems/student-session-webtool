import { Button, Flex, Text} from "@chakra-ui/react";
import { API } from "../../api";
import { SSTimeslot } from "../../api/studentsessions";

export type ApplicationListItemProps = {
  timeslot: SSTimeslot;
  onTimeslotClick: () => void;
}
export default function TimeslotListItem({timeslot, onTimeslotClick}: ApplicationListItemProps) {
  const booked = !!timeslot.studentId;
  return (
    <Button p="2rem" display="flex" justifyContent="space-between" w={{base: "80%", md: "38rem"}} alignSelf="center" variant="card" onClick={onTimeslotClick}>
      <Text color="ArkadWhite">{API.SSs.formatTime(timeslot.start, timeslot.end)}</Text>
      <Flex bg={!booked ? "darkRed" : "lightGreen"} p="0.5rem" rounded="md" alignItems="center" justifyContent="center"> 
        <Text color="ArkadWhite">{!booked ? "Not booked" : "Booked"}</Text>
      </Flex>
    </Button>
  )
}
