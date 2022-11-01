import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Image } from '@chakra-ui/react';
import React, { useState } from 'react';

import { API } from '../api'
import { Role } from '../api/users';
import { AuthContext } from '../components/AuthContext';
import source from "../assets/images/arkad_logo.png";
  
export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const authContext = React.useContext(AuthContext);

  const login = async () => {
    setLoading(true);
    const success = await API.auth.login(email.toLowerCase(), password);
    const role = await API.auth.getUserRole();
    setLoading(false);
    if (success.status === 400) {
      alert('wrong email or password');
    }else if (!success.ok) {
      alert('Login not successful');
    } else if (role !== Role.CompanyRepresentative) {
      alert('you need to be a company representative to login');
    }
    else {
      authContext.signIn();
    }
  }

  const isError = email === ''

  return (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Flex bg="arkadWhite" p="1rem" flexDir="column">
        <Image src={source} alt="Logo" boxSize="230px" />
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
        <Button m="2rem" variant="primary" onClick={login} isLoading={loading}>Login</Button>
      </Flex>
    </Flex>
  )
}
