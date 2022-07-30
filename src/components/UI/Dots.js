import React from "react";
import styles from './Dots.module.css'

export function ContextMenu(){
    return <div className={styles.menu}>
        <ul>
            <li>Log Out</li>
        </ul>
    </div>
}


export function Dots(){
    return( 
       <div className={styles.dot_container}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
    )}

