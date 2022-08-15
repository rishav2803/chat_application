import Chats from "./Chats";
import styles from './ChatBody.module.css'
import { useEffect, useRef } from 'react'

const ChatBody = (props) => {
    const baseRef = useRef(null)
    const getChat = (list) => {
        let chat = []
        // This list will show the message of sender and the receiver of the message
        const tempList = list.filter(l => l.sName === props.userName && l.rName === props.senderName || l.sName === props.senderName && l.rName === props.userName)
        for (let i = 0; i < tempList.length; i++) {
            const item = tempList[i].message;
            const name = tempList[i].sName;
            const time = tempList[i].time;
            if (name !== undefined) {
                if (name == props.userName) {
                    chat.push(<Chats chat={item} time={time} className={styles.chat1}></Chats>)
                }
                else {
                    // This is so that chat of other than current receier chat is not showing
                    if (name === props.senderName) {
                        chat.push(<Chats chat={item} time={time}></Chats>)
                    }
                }
            }
        }
        return chat;
    }

    const getHistoryChat = (list) => {
        let historyChat = [];
        console.log(list);
        for (let i = 0; i < list.length; i++) {
            const item = list[i].message_text;
            const name = list[i].sender;
            const time = list[i].created_at;
            const id = list[i].message_id;
            if (name !== undefined) {
                if (name == props.userName) {
                    historyChat.push(<Chats key={id} chat={item} time={time} className={styles.chat1}></Chats>)
                }
                else {
                    // This is so that chat of other than current receier chat is not showing
                    if (name === props.senderName) {
                        historyChat.push(<Chats chat={item} time={time}></Chats>)
                    }
                }
            }
        }
        return historyChat;
    }

    // Following is used to auto scroll when a node is inserted in the base DOM element 
    useEffect(() => {
        if (baseRef) {
            baseRef.current.addEventListener('DOMNodeInserted', (e) => {
                const { currentTarget: target } = e
                target.scroll({ top: target.scrollHeight, behaviour: 'smooth' })
            })
        }

    }, [])

    return <div className={`${styles.base}`} ref={baseRef}>
        {getHistoryChat(props.list1)}
        {getChat(props.list)}
    </div>
}
export default ChatBody;