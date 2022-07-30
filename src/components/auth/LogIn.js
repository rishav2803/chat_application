import { useState } from 'react'
import styles from './LogIn.module.css'
import { socket } from '../../service/socket'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const LogIn=(props)=>{
    const [enteredName,setEnteredName]=useState('')
    const formHandler=()=>{

        socket.emit('user_connected',enteredName);

        props.onLogin(true,enteredName)
    }

    const enteredNameHandler=(event)=>{
        setEnteredName(event.target.value)
    }

    return <div className={styles.container}> 
        <div className={styles.profile}>
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        </div>
        <div className={styles.form_group}>
            <label>Name</label>
            <input  onChange={enteredNameHandler} type='text' placeholder={"Enter your name here"} className={styles.input}></input>
       </div>
        {/* <div className={styles.form_group}>
            <label>Password</label>
            <input  onChange={enteredNameHandler} type='password' placeholder={"Enter your Password here"} className={styles.input}></input>
        </div> */}
        <button className={styles.btn} onClick={formHandler}>Submit</button>
        <div className={styles.meta}>
            <p>Don't have an account?<a href="/">Register Here</a>.</p>
        </div>
    </div>

}

export default LogIn;