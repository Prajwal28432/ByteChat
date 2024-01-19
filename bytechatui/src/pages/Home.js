import React, { useEffect } from "react";
import { Container, Box, Text,Tabs, TabList, TabPanels, Tab, TabPanel  } from "@chakra-ui/react";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import { redirect } from "react-router-dom";
export const Home = () => {

     useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if(user){
        redirect('/chats')
      }
     })

  return (
    <Container maxW="md"m={"40px auto" } borderRadius={'20px'} centerContent bg={"black"} >
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"black"}
        w={"100%"}
        m={"50px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text fontSize="3xl" color="white">
          ByteChat
        </Text>
      </Box>
      <Box
        bg={'white'}
        w={"100%"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={'1em'}>
            <Tab width={'50%'} border={'black 2px '}>Login</Tab>
            <Tab width={'50%'}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
