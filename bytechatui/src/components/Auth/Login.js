import React ,{useState} from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack ,useToast} from '@chakra-ui/react'
import axios from 'axios';
// import { redirect } from 'react-router-dom';

const Login = () => {
  
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    const [show,setShow] =useState(false)
    const [loading, setLoading] = useState(false);
    const toast = useToast();
  
    const handleClick=()=>{
      setShow(!show)
    }
     const submitHandler = async()=>{
      setLoading(true);
    if( !email ||!password){
      toast({
         title: 'Please fill all the details',
        
         status: 'warning',
         duration: 5000,
         isClosable: true,
         position:'bottom'
      })
      setLoading(false);
      return;
     }

     try {
      const config ={
         headers:{
            "Content-type":"application/json"
         },
      }
      const {data} = await axios.post('/api/user/login',{email,password},config);
      // redirect('/chats')
      toast({
         title: 'LoginSuccessful',
         
         status: 'success',
         duration: 5000,
         isClosable: true,
         position:'bottom'
      });
      setTimeout(() => {
         
         window.location.href='/chats  ';
      },1000);

       localStorage.setItem("userInfo",JSON.stringify(data));
       setLoading(false);
     } catch (error) {
      toast({
         title: 'Error occured',
        
         status: 'error',
         duration: 5000,
         isClosable: true,
         position:'bottom'
       });
       setLoading(false)
     }
   }
   
    return (
      <VStack spacing={'5px'} color={'black'}>
       
       <FormControl id='email' isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder='email' onChange={(e)=>setEmail(e.target.value)} />
       </FormControl>
       
       <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size='md'>
       
          <Input  type={show?"text":"password"} placeholder='username' onChange={(e)=>setPassword(e.target.value)} />
          <InputRightElement>
          <Button bg={'transparent'} h='1.75rem' size='sm' onClick={handleClick}> {show?"Hide":"show"}</Button>
          </InputRightElement>
       </InputGroup>
       </FormControl>
      
       <FormControl id='email' isRequired>
          <Button colorScheme='blue' width={"100%"} marginTop={"15px"} isLoading={loading} onClick={submitHandler} >Login</Button>
       </FormControl>
      </VStack>
    )
  
}

export default Login