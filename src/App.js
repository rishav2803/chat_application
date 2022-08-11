import Header from "./components/Header";
import ChatBody from "./components/ChatBody";
import { Comment } from "./components/Comment";
import Card from "./components/UI/Card";
import LogIn from "./components/auth/LogIn";
import Welcome from './components/Welcome'
import Users from "./components/ChatBar/Users";
import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import Profile from "./components/ChatBar/Profile";
import Chats from "./components/Pages/Chat";
import ProtectedRoute from "./components/auth/Protected";

function App() {
  const [receviedMessages, setreceviedMessages] = useState([])
  const [historyMessages, setHistoryMessages] = useState([])
  const [isLogin, setisLogin] = useState(false)
  const [userName, setUserName] = useState('')
  const [isVisible, setisVisible] = useState(false)
  const [isUser, setisUser] = useState(false)
  const [receiverName, setReceiverName] = useState('')


  const receviedMessageHandler = (receviedMessage) => {
    setreceviedMessages(prev => {
      return [...prev, receviedMessage]
    })
  }

  const historyMessageHandler = (historyMessage) => {
    setHistoryMessages(historyMessage);
  }


  const loginHandler = (isLogin, uName = '') => {
    setisLogin(isLogin)
    setUserName(uName)
  }

  const userHandler = (sName, value) => {
    setReceiverName(sName);
    // setreceviedMessages([]);
  }



  const chatshowHandler = (value) => {
    setisVisible(value);
    setreceviedMessages([]);
  }

  // <SignUp></SignUp>
  return (
    <>
      <Routes>
        <Route path="/user/login" element={<LogIn onLogin={loginHandler} />}></Route>
        <Route path="/user/register" element={<SignUp />}></Route>
        <Route path='/' element={
          <ProtectedRoute isLogin={isLogin}>
            <Chats
              userName={userName}
              receiverName={receiverName}
              isVisible={isVisible}
              loginHandler={loginHandler}
              receviedMessages={receviedMessages}
              historyMessages={historyMessages}
              receviedMessageHandler={receviedMessageHandler}
              historyMessageHandler={historyMessageHandler}
              chatshowHandler={chatshowHandler}
              userHandler={userHandler}
            />
          </ProtectedRoute>
        }>
        </Route>
      </Routes>
    </>
  );
}

export default App;