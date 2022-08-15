import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ContextMenu.module.css'
import { faUserCheck, faUserCircle, faClose, faSignOut, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import ContactsContext from '../../context/contacts-context';
import { socket } from '../../service/socket';

const ContextMenu = ({ onInvisible, onDisconnect }) => {
    const ctx = useContext(ContactsContext);
    const disconnectHandler = () => {
        socket.disconnect();
        onDisconnect(false)
    }
    const visiblityHandler = () => {
        onInvisible(false);
    }
    return (
        <>
            <div className={styles.contextMenu} >
                <ul className={styles.menu}>
                    <span className={styles.close} onClick={visiblityHandler}><FontAwesomeIcon icon={faClose} /></span>
                    {/* <li className={styles.recent}><FontAwesomeIcon icon={faUserCircle} className={styles.user}></FontAwesomeIcon>Profile</li> */}
                    {ctx.isVisible && <li className={styles.recent} onClick={() => { ctx.onActiveContact(); onInvisible() }} ><FontAwesomeIcon icon={faUserCheck} className={styles.user} />Active User</li>}
                    {!ctx.isVisible && <li className={styles.recent} onClick={() => { ctx.onRecentContact(); onInvisible() }}><FontAwesomeIcon icon={faUserGroup} className={styles.user} />Recent Contacts</li>}
                    <li className={styles.recent} onClick={disconnectHandler}><FontAwesomeIcon icon={faSignOut} className={styles.user} />Disconnect</li>
                </ul>
            </div>
        </>
    )
}

export default ContextMenu;
