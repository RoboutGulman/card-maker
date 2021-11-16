import React from 'react'
import classes from './MyInput.module.css'

const MyInput = (props: any) => {
    return (
        <input className={classes.myInput} {...props}/>
    )
}

export default MyInput
