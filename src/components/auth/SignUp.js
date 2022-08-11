import React, { useState } from "react";
import styles from './SignUp.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { socket } from '../../service/socket'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from "react-toastify";
import { createUser } from "../../service/UserService";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'


const SignUp = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        userName: '',
        email: '',
        password: '',
    })

    const toastOptns = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })

    }
    const formSubmitHandler = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { userName, email, password } = values;
            const data = await createUser({ userName, email, password });
            if (data.status === false) {
                toast.error(data.mssg, toastOptns)
            }
            if (data.status === true) {
                navigate('/user/login?registered=true');
            }
        }
    }

    const handleValidation = () => {
        const { userName, email, password } = values;
        if (userName == '') {
            toast.error("Name should be present", toastOptns);
            return false;
        }
        if (userName.length < 3) {
            toast.error("Name should of more than 3 characters", toastOptns);
            return false;
        }
        if (email === '') {
            toast.error("Email should be present", toastOptns);
            return false;
        }
        if (password === '') {
            toast.error("Password should be present", toastOptns);
            return false;
        }
        if (password.length < 6) {
            toast.error("Password should be greater than 6 characters", toastOptns);
            return false;
        }
        return true;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.profile}>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
                <form onSubmit={formSubmitHandler}>
                    <div className={styles.form_group}>
                        <label>Username</label>
                        <input type='text' placeholder={"Enter your name here"} className={styles.input} name='userName' onChange={(e) => handleChange(e)} value={values.userName}></input>
                    </div>
                    <div className={styles.form_group}>
                        <label>Email</label>
                        <input type='email' placeholder={"Enter your Email here"} className={styles.input} name='email' onChange={(e) => handleChange(e)} value={values.email}></input>
                    </div>
                    <div className={styles.form_group}>
                        <label>Password</label>
                        <input type='password' className={styles.input} name='password' onChange={(e) => handleChange(e)} value={values.password} placeholder={"Enter your Password here"}></input>
                    </div>
                    {/* <div className={styles.form_group}>
                <label>Confirm Password</label>
                <input type='password' placeholder={"Enter your Password here"} className={styles.input} name='confirmPassword'></input>
            </div> */}
                    <button className={styles.btn} >Submit</button>
                    <div className={styles.meta}>
                        <p>Already have an account?<Link to="/user/login">LogIn Here</Link>.</p>
                    </div>
                </form>
            </div >
            <ToastContainer ></ToastContainer>
        </>
    )
}

export default SignUp;