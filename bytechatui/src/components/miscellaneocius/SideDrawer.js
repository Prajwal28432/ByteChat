import {
  Button,
  Tooltip,
  Box,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  useDisclosure,
  Input,
  Toast,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";
import {Effect} from 'react-notification-badge';
import NotificationBadge from 'react-notification-badge'
const SideDrawer = () => {
  const { user ,setSelectedChat ,chats,setChats,notification ,setNotification} = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();


  const toast = useToast();
  const logoutHandler =()=>{
    localStorage.removeItem("userInfo");
    window.location.href='/';
  }
  const handleSearch= async()=>{
       if(!search){
        toast({
          title:'Please enter something in search',
          status:"warning",
          duration:'5000',
          isClosable:true,
          position:'top-left'
        })
        return;
       }

       try {
        setLoading(true);
        const config ={
          headers:{
            Authorization:`Bearer ${user.token} `,
          }
        }

        const {data} = await axios.get(`/api/user?search=${search}`,config);
        setLoading(false);
        setSearchResult(data);
       } catch (error) {
        toast({
          title:'Error occured',
          description:'faile to load the seach results',
          status:"error",
          duration:'5000',
          isClosable:true,
          position:'bottom-left'
        })
       }
  }
  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);                                                                                                                                                                                              
      
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  
  return (
    <>
      <Box display={"flex"} justifyContent={"flex-start"}>
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"Work sans"} m={"0 auto"}>
          ByteChat
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge count={notification.length}
               effect={Effect.SCALE} />
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            <MenuList pl={2} >
              {!notification.length&&"No New Messages"}
              {notification.map(notif=>(
                <MenuItem key={notif._id} onClick={()=>{setSelectedChat(notif.chat); 
                setNotification(notification.filter((n)=>n!==notif))}}>
                  {notif.chat.isGropChat?`New Message in ${notif.chat.chatName}`:`new message from ${getSender(user,notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen ={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerHeader> Search Users</DrawerHeader>

        <DrawerBody>
          <Box d='flex' pb={2}>
            <Input placeholder="search by name or email" width={'70%'} mr={'6px'} value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <Button onClick={handleSearch}>Go</Button>
          </Box>
          {loading?(<ChatLoading/>):(
            searchResult?.map((user)=>(
              <UserListItem key={user._id} 
                user ={user}
              handleFunction={()=>accessChat(user._id)} 
              />
            ))
          )}

          {loadingChat && <Spinner ml='auto' d='flex' />}
        </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
