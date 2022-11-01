import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Image, Flex, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API } from "../api";
import { SSApplication, UpdateApplicationDto } from "../api/sSApplications";
import { Programme, Student } from "../api/students";
import { User } from "../api/users";

export type StudentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  studentId: number;
}

export default function StudentModal({isOpen, onClose, studentId}: StudentModalProps) {
  const [application, setApplication] = useState<SSApplication | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getAppAndStudent() {
    setLoading(true);
    const sdnt = await API.students.getStudent(studentId);
    const app = await API.sSApplications.getApplicationForStudent(sdnt.id);
    const user = await API.users.getUser(sdnt.userId);
    setApplication(app ?? null);
    setStudent(sdnt);
    setUser(user);
    setLoading(false);
  }
  async function accept() {
    setLoading(true);
    application && await API.sSApplications.changeApplication(application.id, {status: 1} as UpdateApplicationDto)
    await getAppAndStudent();
    setLoading(false);
  }
  async function pending() {
    setLoading(true);
    application && await API.sSApplications.changeApplication(application.id, {status: 0} as UpdateApplicationDto)
    await getAppAndStudent();
    setLoading(false);
  }
  async function reject() {
    setLoading(true);
    application && await API.sSApplications.changeApplication(application.id, {status: 2} as UpdateApplicationDto)
    await getAppAndStudent();
    setLoading(false);
  }
  const getCvUrl = async (userId: number) => {
    try{
      const Uri = await API.s3bucket.getFromS3(userId.toString(), ".pdf")
      return <a href={Uri}>Download CV</a>;
    }catch{
      return null;
    }
  }

  useEffect(() => {
    setLoading(true);
    getAppAndStudent();
    setLoading(false);
  }, []);
  
  if(!student || !user || !application || loading){
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex p="3rem" justifyContent="center" alignItems="center">
          <Spinner size="lg" color="arkadDarkBlue"/>
        </Flex> 
      </ModalBody>

      <ModalFooter>
        <Button variant="primary" mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>

    )
  }

  return (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      {!student || !user || !application || loading ? <> 
        <Flex p="3rem" justifyContent="center" alignItems="center">
          <Spinner size="lg" color="arkadDarkBlue"/>
        </Flex> 
        <Button variant="primary" mr={3} onClick={onClose}>
            Close
        </Button> 
      </> : <>
      <ModalHeader>
        {user.profilePictureUrl && 
        <Image 
          w="5rem"
          h="5rem"
          rounded="full"
          src={user.profilePictureUrl}
        />}
        {user.firstName} {user.lastName}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex justifyContent="space-between" flexDir="column">
          <Text>email: {user.email}</Text>
          <Text>phone: {user.phoneNr}</Text>
          <Text>Program: {student.programme && Programme[student.programme].replaceAll("_", " ")}</Text>
          <Text>Year: {student.year}</Text>
          <Text>Master: {student.masterTitle}</Text>
          {user.hasCv && <Text><>CV: {getCvUrl(user.id)}</></Text>}
          {student.linkedIn && <Text>LinkedIn <a href={student.linkedIn}>LinkedIn profile</a></Text>}
          <Box bg="gray.700" flexDir="column" border="0.1rem" borderColor="ArkadDarkBlue" rounded="md">
            <Text bg="ArkadDarkBlue" color="ArkadWhite">Message from student</Text>
            <Text>{application.motivation}</Text>
          </Box>
        </Flex>
      </ModalBody>

      <ModalFooter>
        <Button variant="primary" mr={3} onClick={onClose}>
          Close
        </Button>
        {application.status !== 1 && <Button variant="accept" mr={3} onClick={accept}>
          Accept
        </Button>}
        {application.status === 2 && <Button variant="secondary" mr={3} onClick={pending}>
          set to pending
        </Button>}
        {application.status === 0 &&  <Button variant="decline" mr={3} onClick={reject}>
          Reject
        </Button>}
      </ModalFooter>
      </>}
    </ModalContent>
  </Modal>
  )
}