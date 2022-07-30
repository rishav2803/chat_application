import React from "react"
import styles from './NoContacts.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPlusCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons'


const NoContacts=()=>{
    return <div className={styles.container}>
        <div className={styles.no_contact}>
            <p>You dont have any contacts yet</p>
            <p>Add a contact</p>
            <span><FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon></span>
        </div>
    </div>
}

export default NoContacts;

