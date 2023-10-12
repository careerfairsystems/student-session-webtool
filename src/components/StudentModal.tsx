import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	HStack,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Image,
	Flex,
	Text,
	Box,
	Link,
	SimpleGrid,
	Skeleton,
	SkeletonText,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API } from "../api";
import { SSApplication, UpdateApplicationDto } from "../api/sSApplications";
import { Programme, Student } from "../api/students";
import { User } from "../api/users";
import StudentInfoItem from "./StudentInfoItem";

export type StudentModalProps = {
	isOpen: boolean;
	onClose: () => void;
	studentId: number;
};

export default function StudentModal({
	isOpen,
	onClose,
	studentId,
}: StudentModalProps) {
	const [application, setApplication] = useState<SSApplication | null>(null);
	const [student, setStudent] = useState<Student | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [cvUri, setCvUri] = useState<string | null>(null);

	async function getAppAndStudent() {
		setLoading(true);
		const sdnt = await API.students.getStudent(studentId);
		const app = await API.sSApplications.getApplicationForStudent(sdnt.id);
		const user = await API.users.getUser(sdnt.userId);
		const uri = await API.s3bucket.getFromS3(user.id.toString(), ".pdf");
		setApplication(app ?? null);
		setStudent(sdnt);
		setUser(user);
		setLoading(false);
		if (uri.ok) {
			setCvUri(uri.url);
		}
	}
	async function accept() {
		setLoading(true);
		application &&
			(await API.sSApplications.changeApplication(application.id, {
				status: 1,
			} as UpdateApplicationDto));
		await getAppAndStudent();
		onClose();
		setLoading(false);
	}
	async function pending() {
		setLoading(true);
		application &&
			(await API.sSApplications.changeApplication(application.id, {
				status: 0,
			} as UpdateApplicationDto));
		await getAppAndStudent();
		onClose();
		setLoading(false);
	}
	async function reject() {
		setLoading(true);
		application &&
			(await API.sSApplications.changeApplication(application.id, {
				status: 2,
			} as UpdateApplicationDto));
		await getAppAndStudent();
		onClose();
		setLoading(false);
	}

	useEffect(() => {
		getAppAndStudent();
	}, []);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<HStack justifyContent="space-between" mr="2rem">
						<Box>
							<Image
								w="5.5rem"
								h="5.5rem"
								rounded="full"
								src={
									user
										? `https://cvfiler.s3.eu-north-1.amazonaws.com/${
												user.id
										  }.jpg?${new Date()}`
										: "public/images/arkad_logo.png"
								}
							/>
							<Text>
								<Skeleton isLoaded={!loading}>
									{user?.firstName ?? " "}{" "}
									{user?.lastName ?? " "}
								</Skeleton>
							</Text>
						</Box>
						{student?.linkedIn ? (
							<Button
								variant="secondary"
								p="1rem"
								as="a"
								href={student.linkedIn}
								target="_blank"
								rel="noreferrer"
							>
								LinkedIn
							</Button>
						) : (
							<Text> No LinkedIn</Text>
						)}
					</HStack>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex justifyContent="space-between" flexDir="column">
						<StudentInfoItem
							loading={loading}
							label="Email"
							value={user?.email ?? "no email"}
						/>
						<StudentInfoItem
							loading={loading}
							label="Phone"
							value={user?.phoneNr ?? "No phone number"}
						/>
						<StudentInfoItem
							loading={loading}
							label="Program"
							value={
								student?.programme
									? student?.programme &&
									  Programme[student.programme].replaceAll(
											"_",
											" "
									  )
									: "No program"
							}
						/>
						<StudentInfoItem
							loading={loading}
							label="Year"
							value={String(student?.year ?? "No year")}
						/>
						<StudentInfoItem
							loading={loading}
							label="Master"
							value={student?.masterTitle ?? "No master"}
						/>
						{user && (
							<Skeleton isLoaded={!loading}>
								<VStack align="strech" spacing="0" my="0.2rem">
									<Text fontWeight={700}>CV: </Text>
									{cvUri ? (
										<Link
											color="ArkadLightBlue"
											href={cvUri}
										>
											Download CV
										</Link>
									) : (
										<Text>CV not uploaded</Text>
									)}
								</VStack>
							</Skeleton>
						)}
						<Box rounded="md" mt="1rem">
							<Skeleton isLoaded={!loading}>
								<Text fontWeight={700} fontSize="1.2rem">
									Message from student
								</Text>
							</Skeleton>
							<SkeletonText isLoaded={!loading}>
								<Text>{application?.motivation ?? " "}</Text>
							</SkeletonText>
						</Box>
					</Flex>
				</ModalBody>

				<ModalFooter>
					<SimpleGrid columns={3} spacing="1rem" w="100%">
						<Button variant="primary" onClick={onClose}>
							Close
						</Button>
						{(application?.status === 2 ||
							application?.status === 0) && (
							<Button variant="accept" onClick={accept}>
								Accept
							</Button>
						)}
						{(application?.status === 2 ||
							application?.status === 1) && (
							<Button variant="secondary" onClick={pending}>
								Pending
							</Button>
						)}
						{(application?.status === 1 ||
							application?.status === 0) && (
							<Button variant="decline" onClick={reject}>
								Reject
							</Button>
						)}
					</SimpleGrid>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
