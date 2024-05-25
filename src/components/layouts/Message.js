import { useState, useEffect } from 'react'
import styles from './Message.module.css'

export default (({type, message}) =>{

    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState(message);

    useEffect (() =>{
        if(!message){
            setVisible(false)
            return
        }
        setVisible(true);

        const timer = setTimeout(() =>{
            setVisible(false)
            setMsg('');
        }, 3000);
    
        return () => clearTimeout(timer)

    }, [message])

    return(
        <>
        {visible && (
            <div className={`${styles.message} ${styles[type]}`}>
            {message}
        </div>
        )}
        </>
    )
})