import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack,useToast } from '@chakra-ui/react'
import React,{useState} from 'react'

// import {useHistory} from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {
   const [show,setShow] =useState(false)
  const [name, setName] = useState('');
  const [email,setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic,setPic] = useState()
 const [loading, setLoading] = useState(false);
 const toast = useToast();

//  const history = useHistory();
  const handleClick=()=>{
    setShow(!show)
  }
   const submitHandler = async()=>{
    setLoading(true);
    if(!name ||!email ||!password){
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
      const config  ={
         headers:{
            "Content-type":"application/json",
         }
      }
      const {data} = await axios.post("/api/user",{name,email,password},config);
      toast({
         title: 'Registration Successful',
        
         status: 'success',
         duration: 5000,
         isClosable: true,
         position:'bottom'
       });
       

       localStorage.setItem('userInfo',JSON.stringify(data));
       setLoading(false);
      //  history.pushState('/chats')
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
  const postDetails= ()=>{
     setLoading(true);
     if(pic===undefined){
      toast({
         title: 'Please select an Image!',
        
         status: 'warning',
         duration: 5000,
         isClosable: true,
         position:'bottom'
       });
       return;
     }

     if(pic.type==='image/jpeg'||pic.type==='image/png'){
      const data = new FormData();
      data.append("file",pic)
      data.append("upload_preset","byteapp");
      data.append("cloud_name","bytechat");

     }
   }



  return (
    <VStack spacing={'5px'} color={'black'}>
     <FormControl id='name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder='username' onChange={(e)=>setName(e.target.value)} />
     </FormControl>
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
     <FormControl id='pic' > 
     {/* isRequired */}
        <FormLabel>Upload Picture</FormLabel>
        <Input type='file' p={1.5} accept='image/*' onChange={(e)=>postDetails(e.target.files[0])} />
     </FormControl>
     <FormControl id='email' isRequired>
        <Button colorScheme='blue' width={"100%"} marginTop={"15px"} isLoading={loading} onClick={submitHandler} >Sign Up</Button>
     </FormControl>
    </VStack>
  )
}

export default SignUp;