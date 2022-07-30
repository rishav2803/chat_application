import styles from './Comment.module.css'
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPaperPlane, faSmile, faSmileBeam } from '@fortawesome/free-solid-svg-icons'
import { socket } from '../service/socket'
import Picker from 'emoji-picker-react'
export function Comment(props) {
    const [message, setMessage] = useState('')
    const [messageReceived, setMessageReceived] = useState({})
    const [showPicker, setShowPicker] = useState(false);

    const commentRef = useRef()

    const commentChangeHandler = (e) => {
        setMessage(e.target.value)
    }

    const onEmojiClick = (e, emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji)
        setShowPicker(false);

    }

    useEffect(() => {
        socket.on('recived-message', (data) => {
            setMessageReceived(
                {
                    message: data.message,
                    sName: data.sender,
                    rName: data.receiver
                })
        })
        props.onReceviedMessage(messageReceived)
    }, [socket, messageReceived])


    const commentHandler = (event) => {
        socket.emit('send-message', { message: message, sender: props.userName, receiver: props.receiverName })
        props.onReceviedMessage({
            message: message,
            sName: props.userName,
            rName: props.receiverName
        })
        setMessage("");
        commentRef.current.focus();
    }

    return (
        <>
            <div className={styles.comment_container}>
                <div className={styles.comment_box}>
                    <input type='text' onChange={commentChangeHandler} className={styles.input} onKeyPress={e => {
                        if (e.key === 'Enter') {
                            socket.emit('send-message', { message: message, sender: props.userName, receiver: props.receiverName })
                            props.onReceviedMessage({
                                message: message,
                                sName: props.userName,
                                rName: props.receiverName
                            })
                            setMessage("");
                            commentRef.current.focus();
                        }
                    }} ref={commentRef} value={message} />
                    <button className={styles.btn} onClick={commentHandler}><FontAwesomeIcon icon={faPaperPlane} className={styles.icon}></FontAwesomeIcon></button>
                </div>
                <button className={`${styles.emojibtn}`} onClick={() => { setShowPicker(val => !val) }}>
                    {!showPicker && <FontAwesomeIcon icon={faSmile} className={styles.smile}></FontAwesomeIcon>}
                    {showPicker && <FontAwesomeIcon icon={faClose} className={styles.close}></FontAwesomeIcon>}
                </button>
                {showPicker && <div className={styles.emojiContainer}>
                    <Picker pickerStyle={{width:'100%',height:'100',borderRadius:'0',boxShadow:'0'}} onEmojiClick={onEmojiClick}></Picker>
                </div>}
            </div>
        </>

    )
}