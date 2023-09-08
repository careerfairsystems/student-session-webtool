import { HStack, Heading, Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { API } from "../api";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
	const [loading, setLoading] = useState(false);
	const authContext = useContext(AuthContext);

	const logout = async () => {
		setLoading(true);
		await API.auth.logout();
		authContext.signOut();
		setLoading(false);
	};
	return (
		<HStack
			w="100%"
			px="1rem"
			py="0.5rem"
			justifyContent="space-between"
			alignItems="center"
		>
			<Heading fontSize="xl">ARKAD</Heading>
			<Button
				onClick={logout}
				variant="primary"
				fontSize="sm"
				isLoading={loading}
				p="1.5rem"
			>
				Sign Out
			</Button>
		</HStack>
	);
}
