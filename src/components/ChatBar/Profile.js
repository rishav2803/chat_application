import styles from './Profile.module.css'
import { Dots, ContextMenu } from '../UI/Dots'
import { useState } from 'react'



const Profile = (props) => {
    const [isVisible, setisVisible] = useState(false)

    const visibleHandler = () => {
        setisVisible(true)
    }

    return <div className={styles.container}>
        <div className={styles.text} >
            {props.userName}
        </div>
        {!isVisible && <Dots onDisconnect={props.onDisconnect} onClick={visibleHandler}></Dots>}
        {/* { !isVisible && <ContextMenu></ContextMenu>} */}
    </div>
}

export default Profile;