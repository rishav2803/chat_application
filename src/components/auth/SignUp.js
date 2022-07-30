import React, { useState } from "react";
import styles from './SignUp.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { socket } from '../../service/socket'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


const SignUp = () => {
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
    const formSubmitHandler = (event) => {
        event.preventDefault();
        handleValidation()
        // setValues({
        // userName:'',
        // email:'',
        // password:'',
        // })
    }

    const handleValidation = () => {
        const { userName, email, password } = values;
        console.log("Inside validation")
        if (userName == '') {
            toast.error("Name should be present", toastOptns);
        }
        if(userName.length < 3){
            toast.error("Name should of more than 3 characters",toastOptns);
        }
        if(email ===''){
            toast.error("Email should be present",toastOptns);
        }
        if(password ===''){
            toast.error("Password should be present",toastOptns);
        }
        if(password.length < 8){
            toast.error("Password should of more than 3 characters",toastOptns);
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.profile}>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
                <form onSubmit={formSubmitHandler}>
                    <div className={styles.form_group}>
                        <label>Name</label>
                        <input type='text' placeholder={"Enter your name here"} className={styles.input} name='userName' onChange={(e) => handleChange(e)} value={values.userName}></input>
                    </div>
                    <div className={styles.form_group}>
                        <label>Email</label>
                        <input type='email' placeholder={"Enter your Email here"} className={styles.input} name='email' onChange={(e) => handleChange(e)} value={values.email}></input>
                    </div>
                    <div className={styles.form_group}>
                        <label>Password</label>
                        <input type='password' placeholder={"Enter your Password here"} className={styles.input} name='password' onChange={(e) => handleChange(e)} value={values.password}></input>
                    </div>
                    {/* <div className={styles.form_group}>
                <label>Confirm Password</label>
                <input type='password' placeholder={"Enter your Password here"} className={styles.input} name='confirmPassword'></input>
            </div> */}
                    <button className={styles.btn} >Submit</button>
                    <div className={styles.meta}>
                        <p>Already have an account?<a href="/">LogIn Here</a>.</p>
                    </div>
                </form>
            </div>
            <ToastContainer ></ToastContainer>
        </>
    )
}

export default SignUp;