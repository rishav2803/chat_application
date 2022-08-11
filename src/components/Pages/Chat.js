import Card from "../UI/Card";
import Header from "../Header";
import { Comment } from "../Comment";
import Profile from "../ChatBar/Profile";
import Users, { RecentlyContacted } from "../ChatBar/Users";
import ChatBody from "../ChatBody";
import Welcome from "../Welcome";

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
            <Profile userName={userName}></Profile>
            <Users onClick={chatshowHandler}
                onUser={userHandler}
                userName={userName}
                onHistoryMessage={historyMessageHandler}
                onReceivedMessage={receviedMessageHandler}
            />
        </Card>
    )
}
export default Chats;