import Header from "./components/Header";
import ChatBody from "./components/ChatBody";
import { Comment}from "./components/Comment";
import Card from "./components/UI/Card";
import LogIn from "./components/auth/LogIn";
import Welcome from './components/Welcome'
import Users from "./components/ChatBar/Users";
import {useState} from 'react'
import { Router } from "react-router";
import SignUp from "./components/auth/SignUp";
import Profile from "./components/ChatBar/Profile";

function App() {
  const [sentMessages,setsentMessages]=useState([])
  const [receviedMessages,setreceviedMessages]=useState([])
  const [isLogin,setisLogin]=useState(false)
  const [userName,setUserName]=useState('')
  const [isVisible,setisVisible]=useState(false)
  const [isUser,setisUser]=useState(false)
  const [receiverName,setReceiverName]=useState('')
  const [unreadMssg,setunreadMssg]=useState({})


  const chatHandler=(chat)=>{
    setsentMessages((prev)=>{
      return [...prev,chat]
    })
  }
  const receviedMessageHandler=(receviedMessage)=>{
    setreceviedMessages(prev=>{
      return [...prev,receviedMessage]
    })
  }

  const loginHandler=(isLogin,uName='')=>{
    setisLogin(isLogin)
    setUserName(uName)
  }

  const userHandler=(sName,value)=>{
    setReceiverName(sName);
  }

  const unReadMssgHandler=(no)=>{
    setunreadMssg(no);
  }

  const chatshowHandler=(value)=>{
    setisVisible(value);
    // setreceviedMessages([]);
  }

   if(isLogin===false){
     return (
      // <LogIn onLogin={loginHandler}></LogIn>
        <SignUp></SignUp>
     );
   }
  else{
  return( 
    <Card>
      {isVisible &&
      <>
      <Header userName={receiverName} onDisconnect={loginHandler}></Header>
      <ChatBody userName={userName} onUnRead={unReadMssgHandler} list={receviedMessages} list2={sentMessages} senderName={receiverName}></ChatBody>
      <Comment userName={userName} receiverName={receiverName} onEnteredChat={chatHandler} onReceviedMessage={receviedMessageHandler}></Comment>
      </>
      }
      {!isVisible && <Welcome userName={userName}></Welcome>}
      <Profile userName={userName}></Profile>
      <Users unReadMssg={unreadMssg} onClick={chatshowHandler} onUser={userHandler} userName={userName}></Users>
    </Card>
  );
  }
}

export default App;