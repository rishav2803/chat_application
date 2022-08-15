import { useState } from "react";
import ContextMenu from "./ContextMenu";
import styles from './Dots.module.css'


export function Dots({ onDisconnect }) {
    const [isVisible, setIsVisible] = useState(false);

    const visiblityHandler = () => {
        setIsVisible(true);
    }
    const inVisiblityHandler = (data) => {
        setIsVisible(data);
    }
    return (
        <>
            {
                !isVisible &&
                <div className={styles.dot_container} onClick={visiblityHandler}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
            }
            {isVisible &&
                <div className={styles.container}>
                    <ContextMenu onDisconnect={onDisconnect} onInvisible={inVisiblityHandler}></ContextMenu>
                </div>
            }
        </>
    )
}

