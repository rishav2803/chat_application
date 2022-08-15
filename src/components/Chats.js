import styles from './Chats.module.css'

const Chat = ({ chat, time, className }) => {

    return <div className={`${styles.container}`}>
        <div className={` ${styles.chat} ${className}`}>
            <span >{time}</span>
            <p className={styles.text}>{chat}</p>
            <div className={styles.triangle}></div>
        </div>
    </div>
}
export default Chat;