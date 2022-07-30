import styles from './Users.module.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPlusCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { socket } from '../../service/socket'
import NoContacts from '../NoContacts'


const Indicator = () => {
    return <div className={styles.Indicator}>
        1
    </div>
}

const Users = (props) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        socket.on('users_connected', data => {
            setUsers(data)
        })
        console.log(users)
    }, [socket])

    return <div className={`${styles.container} ${users.length==0 && styles.containerAlt}`}>
        {/* {!users.length==0 && <NoContacts></NoContacts>} */}
        <ul className={styles.users}>
            {
                users.filter(user => user.userName != props.userName).map(user => {
                    return <li className={styles.user} onClick={async(e) => {
                        const data=await fetch(`http://localhost:4000/${props.userName}/to/${user.userName}`)
                        const result=await data.json();
                        console.log(result)
                        if(result){
                        props.onClick(true)
                        props.onUser(user.userName, true);
                        }
                    }
                    }>
                        <span className={styles.icon}><FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon></span>
                        <div className={styles.content}>
                            <p>{user.userName}</p>
                            <div className={styles.c}>
                                <p className={styles.meta}>{user.status == true ? "Online" : "Offline"}</p>
                                <span className={`${styles.symbol} ${!user.status && styles.red}`}></span>
                            </div>
                        </div>
                        {/* <Indicator></Indicator> */}
                    </li>;
                })
            }
        </ul>
    </div>

}

export default Users;