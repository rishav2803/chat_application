import { useState, useEffect } from 'react'
import styles from './LogIn.module.css'
import { socket } from '../../service/socket'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { authenticateUser, getAllUsers } from '../../service/UserService'
import 'react-toastify/dist/ReactToastify.css'

const LogIn = (props) => {
    // navigate helps us to change and manage url
    const navigate = useNavigate();
    //contains info about the currently loaded url like pathname and query params 
    const location = useLocation();

    // This is use to check whether the login page is rendred from register or directly
    // If from register we are coming then we will give a notif to user to login using new account
    const queryParmas = new URLSearchParams(location.search);

    const isRegistered = queryParmas.get('registered');

    const [values, setValues] = useState({
        userName: '',
        password: ''
    })

    // this useEffect is going to run only once the page is rendered first time
    useEffect(() => {
        if (isRegistered) {
            toast.info("Registration Successful! Please Login!", toastOptns);
        }
    }, [])

    const toastOptns = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
    }

    const formHandler = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { userName, password } = values;
            const data = await authenticateUser({ userName, password })
            if (data.status === false) {
                toast.error(data.mssg, toastOptns)
            }
            if (data.status === true) {
                props.onLogin(true, values.userName);
                socket.emit('user_connected', values.userName);
                navigate('/');
            }
        }
    }

    const handleValidation = () => {
        const { userName, password } = values;
        if (userName == '') {
            toast.error("Name should be present", toastOptns);
            return false;
        }
        if (password === '') {
            toast.error("Password should be present", toastOptns);
            return false;
        }
        return true;
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.profile}>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
                <div className={styles.form_group}>
                    <label>Username</label>
                    <input onChange={(e) => { handleChange(e) }} type='text' placeholder={"Enter your name here"} className={styles.input} name="userName"></input>
                </div>
                <div className={styles.form_group}>
                    <label>Password</label>
                    <input onChange={e => { handleChange(e) }} type='password' placeholder={"Enter your Password here"} className={styles.input} name="password"></input>
                </div>
                <button className={styles.btn} onClick={formHandler}>Submit</button>
                <div className={styles.meta}>
                    <p>Don't have an account?<Link to="/user/register">Register Here</Link>.</p>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    )
}

export default LogIn;