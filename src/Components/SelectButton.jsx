import { makeStyles } from '@material-ui/core'
import React from 'react'

const SelectButton = ({children,selected,onClick}) => {
    const useStyles = makeStyles((theme) => ({
        SelectButton: {
            padding: 10,
            paddingRight:20,
            border: "2px solid gold",
            paddingLeft:20,
            fontFamily: "Montserrat",
            borderRadius: 5,
            backgroundColor: selected ? "gold" : "",
            color: selected ? "black" : "",
            cursor: "pointer",
            fontWeight: selected?700:500,
            textAlign: "center",
            marginRight: 10,
            "&:hover": {
                backgroundColor: "gold",
                color: "black",
                fontWeight: 700,
            },
            width: "22%",

        }
    }));
    const classes = useStyles();


  return (
    <span className={classes.SelectButton} onClick={onClick}>
      {children}
    </span>
  )
}

export default SelectButton
