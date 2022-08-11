import styles from './Users.module.css'
import { useState, useEffect, useTransition } from 'react'
import { socket } from '../../service/socket'
import UsersList from './List'
import { getRecentContacts } from '../../service/MessageServices'

const RecentlyContacted = (props) => {
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        async function getData() {
            const data = await getRecentContacts(props.userName);
            data.map(d => d.userName = d.RECEIVER)
            setRecentUsers(data);
        }
        getData();
    }, [])


    return (
        <>
            <div className={styles.recentContacts}>
                <p>Recent Contacts</p>
            </div>
            <UsersList users={recentUsers}
                onClick={props.onClick}
                onUser={props.onUser}
                userName={props.userName}
                onReceivedMessage={props.onReceivedMessage}
                onHistoryMessage={props.onHistoryMessage}
            />
        </>

    );

}

const Users = (props) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        socket.on('users_connected', data => {
            setUsers(data);
        })
    }, [socket]);

    return <div className={`${styles.container}`}>
        <RecentlyContacted users={users}
            onClick={props.onClick}
            onUser={props.onUser}
            userName={props.userName}
            onHistoryMessage={props.onHistoryMessage}
        />
        <div className={styles.recentContacts}>
            <p>Active Users</p>
        </div>
        <UsersList users={users}
            onClick={props.onClick}
            onUser={props.onUser}
            userName={props.userName}
            onHistoryMessage={props.onHistoryMessage}
        />
    </div>
}


export default Users;