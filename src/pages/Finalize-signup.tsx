
import { useState } from 'react';
import { Image, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Box } from '@chakra-ui/react';

import { API } from '../api'
import { useParams, useNavigate} from "react-router-dom"
import source from "../assets/images/arkad_logo.png";

export default function FinalizeSignUpScreen() {
  const token = decodeURIComponent(useParams().token ?? '');

  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const finalizeSignUp = async () => {
    if (password != passwordConfirm) {
      alert('Passwords does not match');
      return;
    }
    if (password.length < 8) {
      alert('Password is weak, choose a stronger one');
      return;
    }
    setLoading(true);
    const success = await API.signup.finalizeSignUp({ token, password });
    setLoading(false);
    if (success) {
      alert('Account is now created fully. Proceed to the app to sign in');
      navigate("/done");
    } else {
      alert('Something went wrong, maybe the token expired');
    }
  }
  const isWeakError = password.length < 8 && password.length > 0;
  const noMatchError = password !== passwordConfirm && passwordConfirm.length > 0;

  return (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Flex bg="whiteAlpha.100" p="1rem" alignItems="center" flexDir="column">
        <Image src={source} alt="Logo" boxSize="230px" />
        <FormControl isInvalid={isWeakError || noMatchError}>
        <FormLabel>Password</FormLabel>
        <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        {!isWeakError ? (
          <FormHelperText>
            Enter a password
          </FormHelperText>
        ) : (
          <FormErrorMessage>passwords has to be strong</FormErrorMessage>
        )}
        <FormLabel mt="5">Confirm password</FormLabel>
        <Input type='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
        {!noMatchError ? (
          <FormHelperText>
            Enter the same password
          </FormHelperText>
        ) : (
          <FormErrorMessage>Passwords has to match</FormErrorMessage>
        )}
        </FormControl>
        <Button  m="10" variant="primary" onClick={finalizeSignUp} isLoading={loading}>Finalize Signup</Button>
      </Flex>
    </Flex>
  )
}
