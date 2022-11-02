import { useState } from 'react';
import { Image, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Box } from '@chakra-ui/react';

import { API } from '../api'
import { useParams, useNavigate} from "react-router-dom"

export default function ResetPasswordScreen() {
  const token = decodeURIComponent(useParams().token ?? '');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const resetPassword = async () => {
    if (password.length < 8) {
      alert('Password is too weak, please choose a stronger one');
      return;
    }
    if (password !== passwordConfirm) {
      alert('Passwords does not match');
      return;
    }
    setLoading(true);
    const success = await API.auth.resetPassword(token, password);
    setLoading(false);
    if (!success) {
      alert('Something went wrong, maybe the token expired');
    }
    else {
      alert('Success, the new password is set, go back to the app to log in.');
      navigate('/');
    }
  }
  const isWeakError = password.length < 8 && password.length > 0;
  const noMatchError = password !== passwordConfirm && passwordConfirm.length > 0;

  return (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Flex bg="whiteAlpha.100" p="1rem" alignItems="center" flexDir="column">
        <Image src="/images/arkad_logo.png" alt="Logo" boxSize="230px" />
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
        <Button p="7" m="10" bg={"#F66628"} color="white" rounded="full" onClick={resetPassword} isLoading={loading}>Reset Password</Button>
      </Flex>
    </Flex>
  )
}
