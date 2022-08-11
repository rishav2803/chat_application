import styles from './UsersList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { getAllMessage } from '../../service/MessageServices'

const UsersList = ({ users, onClick, onUser, userName, onHistoryMessage }) => {
    return (
        <ul className={styles.users}>
            {
                users.filter(user => user.userName != userName).map(user => {
                    return <li className={styles.user} onClick={async (e) => {
                        const message = await getAllMessage(userName, user.userName);
                        onHistoryMessage(message);
                        onClick(true)
                        onUser(user.userName, true);
                    }
                    }>
                        <span className={styles.icon}>
                            <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon></span>
                        <div className={styles.content}>
                            <p>{user.userName}</p>
                            <div className={styles.c}>
                                <p className={styles.meta}>{user.status == true ? "Online" : ""}</p>
                                <span className={`${styles.symbol} ${!user.status && styles.red}`}></span>
                            </div>
                        </div>
                        {/* <Indicator></Indicator> */}
                    </li>;
                })
            }
        </ul>
    )
}

export default UsersList;


