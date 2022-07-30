import styles from './Chats.module.css'

const Chat = (props) => {

    return <div className={`${styles.container}`}>
        <div className={` ${styles.chat} ${props.className}`}>
            <span >9:12pm</span>
            <p className={styles.text}>{props.chat}</p>
            <div className={styles.triangle}></div>
        </div>
    </div>
}
export default Chat;