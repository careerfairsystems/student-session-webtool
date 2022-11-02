import { VStack, ListItem } from "@chakra-ui/react";
import { SSTimeslot } from "../../api/studentsessions";
import TimeslotListItem from "./TimeslotListItem";

export type TimeslotListProps = {
  timeslots: SSTimeslot[] | null;
  onTimeslotClick: (studentId: number | null) => void;
}

export default function TimeslotList({timeslots, onTimeslotClick}: TimeslotListProps) {
  timeslots?.sort((a,b) => 
    new Date(a.start).getTime() - new Date(b.start).getTime()
  );
  return (
    <VStack>
      {timeslots?.map((timeslot) => 
        <TimeslotListItem
          key={timeslot.id}
          timeslot={timeslot}
          onTimeslotClick={() => onTimeslotClick(timeslot.studentId)}/>
      )}
    </VStack>
  )
}
