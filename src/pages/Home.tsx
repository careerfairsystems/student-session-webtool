import { Button, Flex, SimpleGrid, Spinner, useDisclosure, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { API } from "../api";
import { SSApplicationDto } from "../api/sSApplications";
import { SSTimeslot } from "../api/studentsessions";
import { AuthContext } from "../components/AuthContext";
import Navbar from "../components/Navbar";
import StudentModal from "../components/StudentModal";
import ApplicationList from "../components/StudentSessionLists/ApplicationList";
import TimeslotList from "../components/StudentSessionLists/TimeslotList";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showApplications , setShowApplications] = useState<boolean>(false);
  const [applications, setApplications] = useState<SSApplicationDto[] | null>(null);
  const [timeslots, setTimeslots] = useState<SSTimeslot[] | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [studentId, setStudentId] = useState<number | null>(null);

  const authContext = React.useContext(AuthContext);

  const getApplications = async () => {
    const appli = await API.sSApplications.getApplications();
    setApplications(appli);
  }
  const getTimeslots = async () => {
    const comp = await API.companies.getMe();
    const tslots = await API.SSs.getTimeslotsByCompanyId(comp.id);
    setTimeslots(tslots);
  }

  useEffect(() => {
    setLoading(true);
    getApplications();
    getTimeslots();
    setLoading(false);
  }, []);

  const onClosee = () => {
    getApplications();
    getTimeslots();
    setStudentId(null);
    onClose();
  }
  const onClick = (id: number | null) => {
    if(id){
    setStudentId(id);
    onOpen();
    } else {
      alert("when this timeslot is booked you can see the student here");
    }
  }
  if(loading) {
    return (
      <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
        <Spinner size="lg" color="arkadDarkBlue"/>
      </Flex>
    )
  }
  return (
    <Box>
      {studentId && <StudentModal isOpen={isOpen} onClose={onClosee} studentId={studentId}/>}
      <Navbar />
      <Flex w="100%" justifyContent="center">
        <Button display="flex" justifySelf="center" m="2rem" variant="primary" onClick={() => setShowApplications(!showApplications)}>{showApplications ? "See timeslots" : "See applications"}</Button>
      </Flex>
      {showApplications ? (
        <ApplicationList onApplicationClick={onClick} applications={applications}/>
      ) : (
        <TimeslotList timeslots={timeslots} onTimeslotClick={onClick}/>
      )}
          
          {/* {studentId && <StudentModal isOpen={isOpen} onClose={onClosee} studentId={studentId} />}
          <Button m="2rem" variant="primary" onClick={() => setShowApplications(!showApplications)}>{showApplications ? "See timeslots" : "See applications"}</Button>
          {showApplications ? 
          <ApplicationList onApplicationClick={onClick} applications={applications}/> : 
          <TimeslotList timeslots={timeslots} onTimeslotClick={onClick}/>
          }
          <Button m="2rem" variant="primary" onClick={logout}>Sign out</Button>
          {studentId && <StudentModal isOpen={isOpen} onClose={onClosee} studentId={studentId} />}
          <Button m="2rem" variant="primary" onClick={() => setShowApplications(!showApplications)}>{showApplications ? "See timeslots" : "See applications"}</Button>
          {showApplications ? 
          <ApplicationList onApplicationClick={onClick} applications={applications}/> : 
          <TimeslotList timeslots={timeslots} onTimeslotClick={onClick}/>
          }
          <Button m="2rem" variant="primary" onClick={logout}>Sign out</Button> */}
    </Box>
  )
}
