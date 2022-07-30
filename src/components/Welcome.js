import styles from './Welcome.module.css'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const Content=styled.div`
    width:60%;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:.9rem;

    & h1{
        margin-left:.8rem;
        font-size:2rem;
        font-family: monospace;
        position:relative;
    }

    & p{
        font-size:2rem;
        font-family: monospace;
    }

    & h1::before,
    & h1::after{
        content:'';
        position:absolute;
        inset:0;
    }
    & h1::before{
        background-color:#f5f5f5;
        animation:typewriter 1.5s ${props=>`steps(${props.len+1})`} forwards;
    }
    & h1::after{
        width:0.125em;
        background-color:black;
        animation:typewriter 1.5s ${props=>`steps(${props.len+1})`} forwards,
                  blink 350ms ${props=>`steps(${props.len+1})`} infinite;
    }
    @keyframes typewriter{
        to{
            left : 100%;
        }
    }
    @keyframes blink{
        to{
            background:transparent;
        }
    }

`


const Welcome=( {userName} )=>{
    return <div className={styles.container}>
            <Content len={userName.length}>
                <p>Hello,</p><h1>{userName}.</h1>
            </Content>
        <p>Welcome to my ChatApp <span><FontAwesomeIcon icon={faComments}></FontAwesomeIcon></span></p>
    </div>
}



export default Welcome;