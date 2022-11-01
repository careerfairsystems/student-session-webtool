import { OrderedList, ListItem } from "@chakra-ui/react";
import { SSTimeslot } from "../../api/studentsessions";
import TimeslotListItem from "./TimeslotListItem";

export type TimeslotListProps = {
  timeslots: SSTimeslot[] | null;
  onTimeslotClick: (studentId: number | null) => void;
}

export default function TimeslotList({timeslots, onTimeslotClick}: TimeslotListProps) {
  return (
    <OrderedList w="80vw" alignItems="center">
      {timeslots?.map((timeslot) => 
        <TimeslotListItem
          key={timeslot.id}
          timeslot={timeslot}
          onTimeslotClick={() => onTimeslotClick(timeslot.studentId)}/>
      )}
    </OrderedList>
  )
}
