import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { API } from "../api";
import { AuthContext } from "../components/AuthContext";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const authContext = React.useContext(AuthContext);
  const logout = async () => {
    setLoading(true);
    await API.auth.logout();
    authContext.signOut();
    setLoading(false);
  }
  return (
    <Flex justifyContent="center" alignItems="center">
      <Button onClick={logout}>Click me</Button>
    </Flex>
  )
}
