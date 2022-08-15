import Card from "../UI/Card";
import Header from "../Header";
import { Comment } from "../Comment";
import Profile from "../ChatBar/Profile";
import Users, { RecentlyContacted } from "../ChatBar/Users";
import ChatBody from "../ChatBody";
import Welcome from "../Welcome";
import ContactsContext from "../../context/contacts-context";
import { useState } from "react";

const Chats = ({
    userName,
    receiverName,
    isVisible,
    chatshowHandler,
    receviedMessageHandler,
    historyMessageHandler,
    receviedMessages,
    historyMessages,
    loginHandler,
    userHandler
}) => {
    const [isRecentContact, setIsRecentContact] = useState(false);
    const recentContactHandler = () => {
        setIsRecentContact(true);
    }
    const activeContactHandler = () => {
        setIsRecentContact(false);
    }
    return (
        <Card>
            {isVisible &&
                <>
                    <Header userName={receiverName} onDisconnect={loginHandler}></Header>
                    <ChatBody userName={userName} list={receviedMessages} list1={historyMessages} senderName={receiverName}></ChatBody>
                    <Comment userName={userName} receiverName={receiverName} onReceviedMessage={receviedMessageHandler}></Comment>
                </>
            }
            {!isVisible && <Welcome userName={userName}></Welcome>}
            <ContactsContext.Provider value={
                {
                    isVisible: isRecentContact,
                    onRecentContact: recentContactHandler,
                    onActiveContact: activeContactHandler
                }
            }>
                <Profile userName={userName} onDisconnect={loginHandler}></Profile>
                <Users onClick={chatshowHandler}
                    onUser={userHandler}
                    userName={userName}
                    onHistoryMessage={historyMessageHandler}
                    onReceivedMessage={receviedMessageHandler}
                />
            </ContactsContext.Provider>
        </Card>
    )
}
export default Chats;