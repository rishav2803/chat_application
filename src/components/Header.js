import styles from './Header.module.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { socket } from '../service/socket'
import { faSignOut, faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {
    const disconnectHandler = () => {
        socket.disconnect();
        props.onDisconnect(false)
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.profile_container}>
                <div className={styles.profile_pic}>
                    <FontAwesomeIcon icon={faUserCircle} className={styles.icon}></FontAwesomeIcon>
                </div>
                <div className={styles.profile_text_container}>
                    <span className={styles.profile_text}>{props.userName}</span>
                </div>
            </div>
            <button className={styles.disconnect} onClick={disconnectHandler}><FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon></button>
        </nav>
    );
}

export default Header;