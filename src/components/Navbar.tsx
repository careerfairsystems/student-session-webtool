import { HStack, Heading, Button, Flex } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { API } from "../api";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
	const [loading, setLoading] = useState(false);
	const [guideText, setGuideText] = useState("View Guide");
	const [showVideo, setShowVideo] = useState(false); // State to control video visibility
	const authContext = useContext(AuthContext);

	const logout = async () => {
		setLoading(true);
		await API.auth.logout();
		authContext.signOut();
		setLoading(false);
	};

	const guide = async () => {
		setLoading(true);
		if (guideText === "View Guide") {
			setGuideText("Hide Guide");
			setShowVideo(true); // Show the video
		} else {
			setGuideText("View Guide");
			setShowVideo(false); // Hide the video
		}
		setLoading(false);
	};

	return (
		<>
			<HStack
				w="100%"
				px="1rem"
				py="0.5rem"
				justifyContent="space-between"
				alignItems="center"
			>
				<Heading fontSize="xl">ARKAD</Heading>
				<Flex>
					<Button
						onClick={guide}
						variant="primary"
						fontSize="sm"
						isLoading={loading}
						p="1.5rem"
					>
						{guideText}
					</Button>
					<Button
						onClick={logout}
						variant="primary"
						fontSize="sm"
						isLoading={loading}
						p="1.5rem"
						marginLeft="1rem"
					>
						Sign Out
					</Button>
				</Flex>
			</HStack>
			{showVideo && (
				<video controls>
					<source src="../../hd1967.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			)}
		</>
	);
}
