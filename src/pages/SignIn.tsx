import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

import { API } from '../api'
import { AuthContext } from '../components/AuthContext';
  
export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const authContext = React.useContext(AuthContext);

  const login = async () => {
    setLoading(true);
    const success = await API.auth.login(email.toLowerCase(), password);
    setLoading(false);
    if (!success) {
      alert('Login not successful');
    }
    else {
      authContext.signIn();
    }
  }

  const isError = email === ''

  return (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Box bg="whiteAlpha.100" p="1rem">
        <FormControl isInvalid={isError}>
        <FormLabel>Email</FormLabel>
        <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        {!isError ? (
          <FormHelperText>
            Enter your email address
          </FormHelperText>
        ) : (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )}
        <FormLabel>Password</FormLabel>
        <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        {!isError ? (
          <FormHelperText>
            Enter your password
          </FormHelperText>
        ) : (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        )}
        </FormControl>
        <Button onClick={login} isLoading={loading}>Login</Button>
      </Box>
    </Flex>
  )
}
